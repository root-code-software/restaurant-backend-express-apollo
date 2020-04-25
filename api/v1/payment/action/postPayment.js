import STRIPE_API from '../../../../lib/stripe';

export default (req, res) => {
    console.log('req', req);
    STRIPE_API.subscribeCustomer(req.body)
        .then(data => {
            console.log(data);
            res.status(200).json({
                success: true,
                msg: 'Payment was successful',
                data
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