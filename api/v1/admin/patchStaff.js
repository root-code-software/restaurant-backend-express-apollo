const { update } = require('../../../database/postgREST/staff');
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

        const updated = await update('email', email, {
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
        if (!updated[0].email) {
            return res.status(404).json({ ...responseMsgs[404], errors: updated });
        }
        return res.status(202).send({
            ...responseMsgs[202],
            data: [{
                ...responseMsgs[202].data[0],
                first_name,
                last_name,
                email,
                password,
                role,
                phone_number,
                nickname,
                avatar
            }]
        });
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};