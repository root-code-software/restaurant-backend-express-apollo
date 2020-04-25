const { update } = require('../../../database/postgREST/user');
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
            other
        } = req.body;

        const cook = await update('email', email, {
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
            other
        });
        if (!cook) {
            throw Error('There was a problem creating user on DB. Please try again or contact support.')
        }
        return res.status(202).send({
            ...responseMsgs[202],
            data: [{
                ...responseMsgs[202].data[0],
                first_name,
                last_name,
                email,
                phone_number,
                nickname,
                avatar,
                is_cook_locked,
                ssn,
                certification_photo
            }]
        });
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};