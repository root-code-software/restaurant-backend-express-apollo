import STRIPE_API from '../../../../lib/stripe';

export default (_req, res) => {
    STRIPE_API.allPlans()
        .then(products => {
            res.status(200).json({
                success: true,
                msg: 'All your Products with their plans where retrieved.',
                data: products
            })
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                success: false,
                msg: 'There was a problem with stripe.',
                errors: [{error: error.message, trace: error.trace}]
            })
        })
}