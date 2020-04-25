const { all } = require('../../../database/postgREST/cook');
const responseMsgs = require('../util/responseMessages');

module.exports =async(_req, res) => {

    try {
        const cooks = await all();
        if (!cooks) {
            throw Error('There was a problem getting cooks on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: cooks
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};