const { create } = require('../../../database/postgREST/payment');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const {
            receiver,
            buyer,
            comment,
            concept,
            register,
            pay_method,
            pay_status,
            other
        } = req.body;

        const payment = await create({
            receiver,
            buyer,
            comment,
            concept,
            register,
            pay_method,
            pay_status,
            other
        })
        console.log(payment)
        if (!payment) {
            throw Error('There was a problem creating payment on DB. Please try again or contact support.')
        }
        return res.status(201).json(responseMsgs[201]);
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};