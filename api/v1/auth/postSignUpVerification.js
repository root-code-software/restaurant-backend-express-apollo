const { decrypt } = require('salteen');
const { validationResult } = require('express-validator/check');
const responseMsgs = require('../util/responseMessages');

const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const { findByEmail, update } = require('../../../database/postgREST/user');

const postSignUpVerification = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            ...responseMsgs[422],
            errors: errors.array()
        });
    }
    const { verificationCode, email } = req.body;
    try {
        if (verificationCode) {
            const user = await findByEmail(email.toLowerCase());
            if (Array.isArray(user) && user.length == 0 ) {
                return res.status(404).json({
                    ...responseMsgs[404],
                    errors: [{
                        msg: 'email not found on postgREST. After search in DB no user with that email found'
                    }]
                })
            }
            if (!user[0].is_diner_locked) {
                return res.status(409).json({
                    ...responseMsgs[409],
                    errors: [{
                        ...responseMsgs[409].errors[0],
                        msg: 'User Already verified.'
                    }]
                });
            }

            const decoder = decrypt(process.env.SECRET_KEY);
            const code = decoder(verificationCode);
            const verifyMe = code.split(',')

            if (email.toLowerCase() === verifyMe[0]) {

                const updateUser = await update('email', email, {
                    is_diner_locked: false
                });
                if (updateUser) {
                    const from_who = process.env.FROM_WHO_EMAIL;
                    const data = {
                        from: from_who,
                        to: email,
                        subject: user[0].first_name + ' Your Account is Activated successfully!',
                        text: 'Now you can Enter in CookinAt App'
                    };
                    mg.messages().send(data, async function (error, _body) {
                        if (error) {
                            throw Error('There was a problem sending Ok Email, but you can enter App normally.\n' + error)
                        }

                        return res.status(201).send(responseMsgs[201]);
                    })
                } else {
                    throw Error('There was a problem Activating your account even if the code sent is good, please call on support for this one: \n' + error)
                }
            }

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

module.exports = postSignUpVerification;