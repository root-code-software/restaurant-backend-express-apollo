const { all } = require('../../../database/postgREST/claim');
const responseMsgs = require('../util/responseMessages');

module.exports =async(_req, res) => {
    try {
        const claims = await all();

        if(claims.length >0){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: claims
            })
        }
        return res.status(200).send({
            ...responseMsgs[200],
            msg: 'claims fetched successfully', 
            data: claims
        });
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};