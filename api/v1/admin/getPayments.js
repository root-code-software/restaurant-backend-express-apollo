const { all  } = require('../../../database/postgREST/payment');
const responseMsgs = require('../util/responseMessages');

module.exports =async(_req, res) => {
    try {
        const payments = await all();

        if(!payments[0].payment_id){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: payments
            })
        }
        return res.status(200).send({
            ...responseMsgs[200], 
            msg: 'payments fetched successfully',
            data: payments
        });
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};