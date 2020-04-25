const { byParam } = require('../../../database/postgREST/claim');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const { claim_id } = req.params;

        const claim = await byParam('claim_id', claim_id);

        if (!claim) {
            throw Error('There was a problem getting claim on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [claim]
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};