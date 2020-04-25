import express  from "express";
import getPlans from './action/getPlans'
import postPayment from './action/postPayment'
import postPlan from './action/postPlan'
import postProduct from './action/postProduct'

const plan = express.Router();

plan.get('/plans', getPlans);
plan.post('/',postPayment);
plan.post('/plan',postPlan);
plan.post('/product',postProduct);

export default plan;