const { update } = require('../../../database/postgREST/user');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const {
            email
        } = req.body;

        const cook = await update('email', email, {
            is_cook_locked: false
        });
        if (!cook) {
            return res.status(404).json(responseMsgs[404]);
        }
        return res.status(201).send(responseMsgs[201]);
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};