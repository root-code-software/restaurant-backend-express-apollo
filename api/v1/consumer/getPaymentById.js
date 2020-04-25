const { byParam } = require('../../../database/postgREST/payment');
const responseMsgs = require('../util/responseMessages');

module.exports =async(req, res) => {
    try {
        const {payment_id}=req.params;
        const payment = await byParam('payment_id', payment_id);
        if (!payment) {
            throw Error('There was a problem getting payment on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [payment]
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};