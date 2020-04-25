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
            promotionals_notification,
            is_diner_locked,
            other
        } = req.body;

        const diner = await update('email',email,{
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
            promotionals_notification,
            is_diner_locked,
            other
        });
        if (!diner) {
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
                is_diner_locked
            }]
        });
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};