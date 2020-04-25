const { all } = require('../../../database/postgREST/dish');
const responseMsgs = require('../util/responseMessages');

module.exports =async(_req, res) => {
    try {

        const dishes = await all();
        if (!dishes) {
            throw Error('There was a problem getting dishes on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: dishes
        })
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};