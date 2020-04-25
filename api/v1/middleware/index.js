const tokenVerification = require('./tokenVerification');
const tokenCookVerification = require('./tokenCookVerification');
const tokenAdminVerification = require('./tokenAdminVerification');
const validateLogIn = require('./validateLogIn');
const validateSignUpCook = require('./validateSignUpCook');
const validateSignUpDiner = require('./validateSignUpDiner');
const validateEmailInParam = require('./validateEmailInParam');
const validateEmailAndPassword = require('./validateEmailAndPassword');
const validateSignUpVerify = require('./validateSignUpVerify');

module.exports = {
    validateEmailAndPassword,
    tokenVerification,
    tokenCookVerification,
    tokenAdminVerification,
    validateLogIn,
    validateSignUpCook,
    validateSignUpDiner,
    validateEmailInParam,
    validateSignUpVerify
};