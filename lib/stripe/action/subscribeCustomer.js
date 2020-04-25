const stripe = require('stripe')(process.env.STRIPE_API_KEY);
// import lowdb from '../../database/lowdb.js';

export default (requestBody) => {
    console.log('requestBody', requestBody)
    if (requestBody.stripeToken) {
        return stripe.customers.create({
            source: requestBody.stripeToken,
            email: requestBody.customerEmail
        }).then(customer => {
            console.log('customer', customer);
            const user = {
                ...customer,
                planId: requestBody.planId, // TODO: check for interval field
                planName: requestBody.planName,
                planAmount: requestBody.planAmount,
                planIntervalCount: requestBody.planIntervalCount
            }
            // lowdb.createUser(user); // TODO: use another DB

            stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {
                        plan: requestBody.planId
                    }
                ]
            });

        })
            .catch(error => {
                console.error(error);
                return "error"
            });
    }
}