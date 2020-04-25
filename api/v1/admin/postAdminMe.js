const { findByEmail } = require('../../../database/postgREST/admin');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;

        const admin = await findByEmail(email.toLowerCase());
        //TODO: check password
        if (password != admin[0].password) {
            return res.status(401).json({
                ...responseMsgs[401],
                errors: [{
                    ...responseMsgs[401].errors[0],
                    msg: 'Password is incorrect'
                }]
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [admin]
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};