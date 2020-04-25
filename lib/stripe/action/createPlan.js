
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export default function createPlan(requestBody) {
    try {
        return stripe.plans.create({
            nickname: requestBody.planName,
            amount: UTILS.formatStripeAmount(requestBody.planAmount),
            interval: requestBody.planInterval,
            interval_count: parseInt(requestBody.planIntervalNumber),
            product: requestBody.productId,
            currency: 'USD'
        });
    } catch (error) {
        console.log(error)
    }

}