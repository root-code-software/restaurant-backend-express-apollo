const { byParam } = require('../../../database/postgREST/cook');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const { user_id } = req.params;
        const cook = await byParam('user_id', user_id);
        if(!cook[0].user_id){ // TODO: change this way to check existence
            return res.status(404).json({
                ...responseMsgs[404],
                errors: cook
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: cook
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};