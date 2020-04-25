const axios = require('axios');

module.exports = async (_req, res) => {
    try {
        const {checkr}= req.param;

        const answer = await axios.get('https://api.checkr.com/v1/reports/'+encodeURIComponent(checkr));

        res.status(200).json({
            success: true,
            msg: 'The petition to Checkr return successfully',
            data: [{
                answer
            }]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Some problem happened',
            errors: [{error: error.message}]
        })
    }
}