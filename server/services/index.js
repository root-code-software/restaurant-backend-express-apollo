const responseLoginDiner = require('./login.diner');
const responseLoginCook = require('./login.cook');
const responsePasswordChange = require('./password.change');
const responsePasswordReset = require('./password.reset');
const responseSignupCook = require('./signup.cook');
const responseSignUpDiner = require('./signup.diner');
const responseVerificationConfirm = require('./verification.confirm');
const responseVerificationResend = require('./verification.resend');

module.exports = {
    responseLoginDiner,
    responseLoginCook,
    responsePasswordChange,
    responsePasswordReset,
    responseSignupCook,
    responseSignUpDiner,
    responseVerificationResend,
    responseVerificationConfirm
};