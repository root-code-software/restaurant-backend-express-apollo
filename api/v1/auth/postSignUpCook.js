const axios = require('axios');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const responseMsgs = require('../util/responseMessages');

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const { findByEmail, update } = require('../../../database/postgREST/user');
const { create } = require('../../../database/postgREST/cook');

module.exports = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            ...responseMsgs[422],
            errors: errors.array()
        });
    }

    try {
        let {
            email,
            password,
            first_name,
            last_name,
            nickname,
            avatar,
            phone_number,
            ssn,
            certification_photo,
            instagram
        } = req.body;

        let userDB = await findByEmail(email.toLowerCase());
        const exists = Array.isArray(userDB) && userDB.length > 0;

        const checkr_res = await axios({
            method: 'POST',
            url: 'https://api.checkr.com/v1/candidates',
            data: {
                first_name,
                last_name,
                email,
                phone: phone_number,
                ssn,
                copy_requested: true
            },
            auth: {
                username: process.env.CHECKR_API_KEY,
                password: ''
            },
        })
            .then((res) => res.data)
            .catch((error) => {
                return {
                    error: error.message,
                    trace: error.response.data.error,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Error in query'
                }
            })

        if (checkr_res.error) {
            return res.status(400).json({
                ...responseMsgs[40],
                errors: [{
                    ...responseMsgs[400].errors[0],
                    msg: "There was a problem with api.checkr.com"
                },
                    checkr_res
                ]
            })
        }

        const cookinatEmail = process.env.FROM_WHO_EMAIL;

        const userData = {
            first_name,
            last_name,
            email,
            ssn,
            certification_photo,
            instagram
        };
        var data = {
            from: email.toLowerCase(),
            to: cookinatEmail,
            subject: 'Cook Admission Request',
            text: 'After SignUp for CookinAt, the next user is requested a cook position:\n' + JSON.stringify({ ...userData, ckeckr: checkr_res.id, })
        };

        mg.messages().send(data, async function (error, _body) {
            try {
                if (error) {
                    throw Error('There was a problem sending verification code, please call on support for this one: \n' + error)
                }
                if (exists) {
                    const user = await update('email', email, {
                        ssn,
                        certification_photo,
                        instagram,
                        role_id: '5'
                    })
                    if (!user) {
                        throw Error('There was a problem updating user on DB. Please try again or contact support.')
                    }
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            console.log(err)
                            throw new Error('bcrypt genSalt', err);
                        }
                        bcrypt.hash(password, salt, async (err, hashedPassword) => {
                            try {
                                if (err) { throw new Error('bcrypt Hash', err.message); }

                                const user = await create({
                                    email: email.toLowerCase(),
                                    password: hashedPassword,
                                    first_name,
                                    last_name,
                                    nickname,
                                    avatar,
                                    phone_number,
                                    ssn,
                                    certification_photo,
                                    instagram
                                });

                                if (Array.isArray(user) && user.length > 0 && user[0].error) {
                                    throw Error('There was a problem creating user on DB. Please try again or contact support. ' + user[0].error)
                                }
                            } catch (error) {
                                console.error(error)
                                return res.status(500).json({
                                    ...responseMsgs[500],
                                    errors: [{ error: error.message, trace: "v1/auth/postSignUpCook bcrypt.hash callback" }]
                                });
                            }
                        });
                    })
                }
                return res.status(201).json({ ...responseMsgs[201], data: [userData] });
            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    ...responseMsgs[500],
                    errors: [{ error: error.message, trace: "v1/auth/postSignUpCook mg.message callback" }]
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
};