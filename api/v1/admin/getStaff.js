const { findByEmail } = require('../../../database/postgREST/staff');
const responseMsgs = require('../util/responseMessages');

module.exports =async(req, res) => {

    try {
        const {
            email
        } = req.body;

        const staff = await findByEmail(email.toLowerCase());
        //TODO: check password
        if(!staff[0].staff_id){
            return res.status(404).json({
                ...responseMsgs[404],
                errors: staff
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: [staff]
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};
