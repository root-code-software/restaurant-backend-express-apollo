import STRIPE_API from '../../../../lib/stripe';

export default (req, res) => {
    STRIPE_API.createPlan(req.body)
        .then(data => {
            res.status(200).json({
                success: true,
                data
            })
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({
                success: false,
                errors: [{error: error.message, trace: error.trace}]
            })
        })
}