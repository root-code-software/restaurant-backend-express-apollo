const { all } = require('../../../database/postgREST/admin');
const responseMsgs = require('../util/responseMessages');

module.exports = async (_req, res) => {

    try {
        const adminList = await all();
        if (adminList.length >0) {
            return res.status(404).json({
                ...responseMsgs[404],
                errors: adminList
            })
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: adminList
        })

    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};