const { update } = require('../../../database/postgREST/review');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {
    try {
        const { review_id } = req.params;
        const {
            reservation_id,
            food,
            service,
            presentation,
            overall_experience,
            comment,
            attachment,
            service_went_fully,
            review_text,
            other,
            disabled,
            reasons
        } = req.body;

        const updatedReview = await update('review_id', review_id, {
            reservation_id,
            food,
            service,
            presentation,
            overall_experience,
            comment,
            attachment,
            service_went_fully,
            review_text,
            other,
            disabled,
            reasons
        });
        if (!updatedReview[0].review_id) {
            return res.status(404).json({...responseMsgs[404], errors: updatedReview});
        }
        return res.status(202).send({
            ...responseMsgs[202],
            data: [{
                ...responseMsgs[202].data[0],
                reservation_id,
                comment,
                review_text
            }]
        });
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};