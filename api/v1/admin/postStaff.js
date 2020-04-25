const { create } = require('../../../database/postgREST/staff');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const {
            first_name,
            last_name,
            email,
            password,
            role,
            phone_number,
            nickname,
            avatar,
            other
        } = req.body;

        const staff = await create({
            first_name,
            last_name,
            email,
            password,
            role, // TODO: Verify this, must be role_id
            phone_number,
            nickname,
            avatar,
            other
        });
        if (!staff) {
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