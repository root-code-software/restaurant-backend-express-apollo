/* Server Side -- Stripe API calls */
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
import {
    subscribeCustomer,
    createProduct,
    createPlan,
    allPlans
} from './action'

export default {
    stripe,
    subscribeCustomer,
    createProduct,
    createPlan,
    allPlans
};
