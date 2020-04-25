const bcrypt = require('bcryptjs');
const responseMsgs = require('../util/responseMessages');

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const { findByEmail, update } = require('../../../database/postgREST/user');

module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (password) {
            const user = await findByEmail(email.toLowerCase());

            if (!user) {
                return res.status(404).json({
                    ...responseMsgs[404],
                    errors: [{
                        msg: 'email not found on Database. After search in DB no user with that email found'
                    }]
                })
            }

            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log(err)
                    throw new Error('bcrypt genSalt', err);
                }
                bcrypt.hash(password, salt, async (err, hashedPassword) => {
                    if (err) { throw new Error('bcrypt Hash', err.message); }
                    let updateUser = await update('email', email, {
                        password: hashedPassword
                    });
                    console.log('user', updateUser)

                    if (updateUser) {
                        const from_who = process.env.FROM_WHO_EMAIL;
                        const data = {
                            from: from_who,
                            to: email,
                            subject: ' You have changed password successfully!',
                            text: 'Now you can Enter in CookinAt App with your new password'
                        };
                        mg.messages().send(data, async function (error, _body) {
                            if (error) {
                                throw Error('There was a problem sending Ok Email, but you can enter App normally.\n' + error)
                            }

                            return res.status(203).send(responseMsgs[203]);
                        })
                    } else {
                        throw Error('There was a problem Activating your account even if the code sent is good, please call on support for this one: \n' + error)
                    }
                });
            })
        } else {
            return res.status(403).json(responseMsgs[403]);
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};