const { create } = require('../../../database/postgREST/user');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            nickname,
            avatar,
            push,
            email_notification,
            sms_notification,
            updates_notification,
            is_cook_locked,
            ssn,
            certification_photo,
            instagram,
            bio,
            video,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            work_holidays,
            last_payoff_method,
            last_payment_method,
            other
        } = req.body;

        const user = await create({
            first_name,
            last_name,
            email,
            password,
            phone_number,
            nickname,
            avatar,
            push,
            email_notification,
            sms_notification,
            updates_notification,
            is_cook_locked,
            ssn,
            certification_photo,
            instagram,
            bio,
            video,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            work_holidays,
            last_payoff_method,
            last_payment_method,
            other
        });
        if (!user) {
            throw Error('There was a problem creating user on DB. Please try again or contact support.')
        }
        return res.status(201).send(responseMsgs[201]);
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};