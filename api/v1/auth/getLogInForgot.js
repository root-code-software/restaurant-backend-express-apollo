const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const sendEmail = require('../../../lib/MailGun/email.send');
const responseMsgs = require('../util/responseMessages');

const { findByEmail, update } = require('../../../database/postgREST/user');

function makeOTP(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNPRSTUVWXYZabcdefghjkmpqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

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

        if (!user) {
            return res.status(404).json(responseMsgs[404])
        }

        const OTP = makeOTP(6);
        bcrypt.genSalt(10, function (err, salt) {
            if (err) { throw new Error('bcrypt genSalt', err); }
            bcrypt.hash(OTP, salt, async (err, hashedPassword) => {
                if (err) { throw new Error('bcrypt Hash', err); }
                const temp = {
                    password: hashedPassword
                }
                let updateUser = await update('email', email, temp);
                if (!updateUser) {
                    throw Error('A problem with PostgREST stalled the process')
                }
            });
        })

        const from_who = process.env.FROM_WHO_EMAIL;

        var data = {
            from: from_who,
            to: email.toLowerCase(),
            subject: 'Now you can reset your password',
            text: 'Here is your One Time Password (OTP) for CookinAt Log In:\n' + OTP +
                '\n Please take into account that your last password is lost. \n' +
                'You must change this password to one of your choice inside the app.'
        };


        const { error } = await sendEmail(data);

        if (error) {
            return res.status(500).json({
                ...responseMsgs[500],
                error: [
                    {
                        msg: 'Your petition failed because of mailgun-js. New OTP generated on database but verification code not sent by mail provider. Use this OTP:  ' + OTP,
                        error
                    }
                ]
            });
        }
        return res.status(200).send({
            ...responseMsgs[200],
            msg: 'We sent you OTP to set a new password to your mail'
        });
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};