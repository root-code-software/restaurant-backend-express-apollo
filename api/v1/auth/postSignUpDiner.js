const bcrypt = require('bcryptjs');
const { encrypt } = require('salteen');
const { validationResult } = require('express-validator/check');
const responseMsgs = require('../util/responseMessages');

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const { create } = require('../../../database/postgREST/diner')
const { findByEmail, update } = require('../../../database/postgREST/user');

const postSignUpDiner = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ ...responseMsgs[422], errors: errors.array() });
    }

    try {
        let {
            email,
            password,
            first_name,
            last_name,
            nickname,
            avatar,
            phone_number
        } = req.body;

        let userDB = await findByEmail(email.toLowerCase());
        const exists = Array.isArray(userDB) && userDB.length > 0;

        const from_who = process.env.FROM_WHO_EMAIL;

        let encripter = encrypt(process.env.SECRET_KEY);
        const verificationCode = encripter(`${email},${Math.random()}`);

        var data = {
            from: from_who,
            to: email.toLowerCase(),
            subject: 'Just one more step!',
            text: 'Here is your verification code for CookinAt Sign Up:\n' + verificationCode
        };

        mg.messages().send(data, async function (error, _body) {
            try {
                if (error) {
                    throw Error('There was a problem sending verification code, please call on support for this one: \n' + error)
                }
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        console.log(err)
                        throw new Error('bcrypt genSalt', err);
                    }
                    bcrypt.hash(password, salt, async (err, hashedPassword) => {
                        try {
                            if (err) { throw new Error('bcrypt Hash', err); }
                            let userData = {}
                            if (exists) { // TODO: check if diner is already created
                                userData = {
                                    first_name: userDB[0].first_name,
                                    last_name: userDB[0].last_name,
                                    email: userDB[0].email
                                }

                            } else {
                                const user = await create({
                                    email: email.toLowerCase(),
                                    password: hashedPassword,
                                    first_name,
                                    last_name,
                                    nickname,
                                    avatar,
                                    phone_number
                                });

                                if (Array.isArray(user) && user.length > 0 && user[0].error) {
                                    throw new Error('Database had a problem creating the resource. ' + user[0].error);
                                }
                                userData = {
                                    first_name: user[0].first_name,
                                    last_name: user[0].last_name,
                                    email: user[0].email,
                                }
                            }
                            return res.status(201).json({ ...responseMsgs[201], data: [userData] });
                        } catch (error) {
                            console.error(error)
                            return res.status(500).json({
                                ...responseMsgs[500],
                                errors: [{ error: error.message, trace: "v1/auth/postSignUpDiner mg.message bcrypt.hash callback" }]
                            });
                        }
                    });
                })

            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    ...responseMsgs[500],
                    errors: [{ error: error.message, trace: "v1/auth/postSignUpDiner mg.message callback" }]
                });
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
}

module.exports = postSignUpDiner;