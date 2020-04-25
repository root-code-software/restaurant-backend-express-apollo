const { byParam } = require('../../../database/postgREST/review');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const { review_id } = req.params;

        const reviews = await byParam('review_id', review_id)
        if (!reviews) {
            throw Error('There was a problem getting reviews on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: reviews
        })
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};