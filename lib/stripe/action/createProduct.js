
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export default function createProduct(requestBody) {
    return stripe.products.create({
        name: requestBody.productName,
        type: 'service'
    });
}