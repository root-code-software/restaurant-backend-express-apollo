const { byParam } = require('../../../database/postgREST/reservation');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const { reservation_id } = req.params;

        const reservation = await byParam('reservation_id', reservation_id);
        if (!reservation) {
            throw Error('There was a problem getting reservation on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [reservation]
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};