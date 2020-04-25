const express = require('express');
let adminRouter = express.Router();
const basicAuth = require('express-basic-auth');
const basicAuthConfig = {
    challenge: true,
    users: {
        superadmin: '/*-789+4561230.',
        "luis-rp": 'Luis123.',
    },
    unauthorizedResponse: { status: 'Unauthorized' },
}
const getAdmins         = require('./getAdmins');
const getClaims         = require('./getClaims');
const getCook           = require('./getCook');
const getCookVerify     = require('./getCookVerify');
const getDiner          = require('./getDiner');
const getPayments       = require('./getPayments');
const getReservations   = require('./getReservations');
const getStaff          = require('./getStaff');
const patchCook         = require('./patchCook');
const patchDiner        = require('./patchDiner');
const patchDish         = require('./patchDish');
const patchReservation  = require('./patchReservation');
const patchReview       = require('./patchReview');
const patchStaff        = require('./patchStaff');
const postAdminMe       = require('./postAdminMe');
const postCookVerify    = require('./postCookVerify');
const postCook          = require('./postCook');
const postDiner         = require('./postDiner');
const postDish          = require('./postDish');
const postPayment       = require('./postPayment');
const postReservation   = require('./postReservation');
const postReview        = require('./postReview');
const postStaff         = require('./postStaff');

const { tokenAdminVerification } = require('../middleware');

adminRouter.post(   '/me'                       , tokenAdminVerification, postAdminMe);
adminRouter.get(    '/all'                      , tokenAdminVerification, getAdmins);
adminRouter.get(    '/claim/:claim_id'          , tokenAdminVerification, getClaims);
adminRouter.get(    '/cook/:user_id'            , tokenAdminVerification, getCook);
adminRouter.get(    '/cook/verify/:checkr'      , tokenAdminVerification, getCookVerify);
adminRouter.get(    '/diner/:user_id'          , tokenAdminVerification, getDiner);
adminRouter.get(    '/payment/:payment_id'      , tokenAdminVerification, getPayments);
adminRouter.get(    '/reservation/reservation_id', tokenAdminVerification, getReservations);
adminRouter.get(    '/staff/staff_id'           , tokenAdminVerification, getStaff);
adminRouter.patch(  '/cook'                     , tokenAdminVerification, patchCook);
adminRouter.patch(  '/diner'                    , tokenAdminVerification, patchDiner);
adminRouter.patch(  '/dish'                     , tokenAdminVerification, patchDish);
adminRouter.patch(  '/reservation'              , tokenAdminVerification, patchReservation);
adminRouter.patch(  '/review'                   , tokenAdminVerification, patchReview);
adminRouter.patch(  '/staff'                    , tokenAdminVerification, patchStaff);
adminRouter.post(   '/cook/verify'              , tokenAdminVerification, postCookVerify);
adminRouter.post(   '/cook'                     , tokenAdminVerification, postCook);
adminRouter.post(   '/diner'                    , tokenAdminVerification, postDiner);
adminRouter.post(   '/dish'                     , tokenAdminVerification, postDish);
adminRouter.post(   '/payment'                  , tokenAdminVerification, postPayment);
adminRouter.post(   '/reservation'              , tokenAdminVerification, postReservation);
adminRouter.post(   '/review'                   , tokenAdminVerification, postReview);
adminRouter.post(   '/staff'                    , tokenAdminVerification, postStaff);

adminRouter.use(basicAuth(basicAuthConfig));

module.exports = adminRouter;