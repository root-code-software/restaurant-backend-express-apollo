const { byParam } = require('../../../database/postgREST/diner');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    try {
        const { user_id } = req.params;
        const diner = await byParam('user_id', user_id);
        if(!diner[0].user_id){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: diner
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: diner
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};