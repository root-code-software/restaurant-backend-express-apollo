const { encrypt } = require('salteen');
const { validationResult } = require('express-validator/check');
const responseMsgs = require('../util/responseMessages');
const sendEmail = require('../../../lib/MailGun/email.send');

const { findByEmail } = require('../../../database/postgREST/user');

module.exports = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(req.body)
        return res.status(422).json({
            ...responseMsgs[422],
            errors: errors.array()
        });
    }
    const { email } = req.params;
    try {
        const user = await findByEmail(email.toLowerCase());

        if (!user[0].user_id) {
            return res.status(404).json(responseMsgs[404])
        }


        if (!user[0].isCookLocked || !user[0].isDinerLocked) {
            return res.status(403).json({
                ...responseMsgs[403],
                msg: 'Your email is already activated'
            })
        }

        let encripter = encrypt(process.env.SECRET_KEY);
        const verificationCode = encripter(`${email},${Math.random()}`);

        const data = {
            from: process.env.FROM_WHO_EMAIL,
            to: email.toLowerCase(),
            subject: user[0].firstName + ' use this code to verify your account!',
            text: 'Here is your verification code for CookinAt Sign Up:\n' + verificationCode
        };
        const { error } = await sendEmail(data);
        if (error) {
            throw Error('There was a problem sending Ok Email, but you can enter App normally.\n' + error)
        }

        return res.status(201).send({
            ...responseMsgs[201],
            msg: `The code you entered is correct ${user[0].firstName}, now you can enter to Log In`,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};