const express = require('express');
let authRouter = express.Router();

const getLogInForgot            = require('./getLogInForgot');
const getSignUpVerificationResend = require('./getSignUpVerificationResend');
const postLogIn                 = require('./postLogIn');
const postSignUpCook            = require('./postSignUpCook');
const postSignUpDiner           = require('./postSignUpDiner');
const postSignUpVerification    = require('./postSignUpVerification');
const patchUserPassword         = require('./patchUserPassword')

let {
    validateEmailAndPassword,
    validateSignUpCook,
    validateSignUpDiner,
    validateEmailInParam,
    validateSignUpVerify
} = require('../middleware');

authRouter.get( '/login/forgot/:email'      , validateEmailInParam(),      getLogInForgot);
authRouter.get( '/signup/verify/resend/:email', validateEmailInParam(),     getSignUpVerificationResend)
authRouter.patch('/user/password'           , patchUserPassword);
authRouter.post('/login'                    , validateEmailAndPassword(),   postLogIn);
authRouter.post('/signup/cook'              , validateSignUpCook(),         postSignUpCook);
authRouter.post('/signup/diner'             , validateSignUpDiner(),        postSignUpDiner);
authRouter.post('/signup/verify'            , validateSignUpVerify(),       postSignUpVerification);

module.exports = authRouter;