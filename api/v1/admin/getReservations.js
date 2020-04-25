const { all } = require('../../../database/postgREST/reservation');
const responseMsgs = require('../util/responseMessages');

module.exports =async(req, res) => {

    try {

        const reservations = await all();
        if(!reservations[0].reservation_id){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: reservations
            })
        }
        return res.status(200).send({...responseMsgs[200], data: reservations});

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};