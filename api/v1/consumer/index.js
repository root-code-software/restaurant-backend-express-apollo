const express = require('express');
let consumerRouter = express.Router();

const getClaim              = require('./getClaim');
const getCooks              = require('./getCooks');
const getDishes             = require('./getDishes');
const getPaymentById        = require('./getPaymentById');
const getReservation        = require('./getReservation');
const getReservationByDiner = require('./getReservationByDiner');
const getReview             = require('./getReview');
const getReviewByCook      = require('./getReviewByCook');

consumerRouter.get('/claim/:claim_id'           ,getClaim);
consumerRouter.get('/cook/all'                  ,getCooks);
consumerRouter.get('/dish/all'                  ,getDishes);
consumerRouter.get('/payment/:payment_id'       ,getPaymentById);
consumerRouter.get('/reservation/diner/:user_id',getReservationByDiner);
consumerRouter.get('/reservation/:reservation_id',getReservation);
consumerRouter.get('/review/cook/:user_id'     ,getReviewByCook);
consumerRouter.get('/review/:review_id'         ,getReview);

module.exports = consumerRouter;