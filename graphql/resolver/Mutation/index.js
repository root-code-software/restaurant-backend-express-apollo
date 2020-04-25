const {
    loginDiner,
    loginCook
}=require('./login');
const {
    change_password,
    reset_password
} = require('./password');
const {
    resend_verification,
    verify_signup_diner
}= require('./verification');
const {
    signupCook,
    signupDiner
} = require('./signup');

module.exports = {
    loginDiner,
    loginCook,
    loginDinerFB: loginDiner,
    loginDinerGoogle: loginDiner,
    loginChefFB: loginCook,
    loginChefGoogle: loginCook,
    change_password,
    reset_password,
    resend_verification,
    verify_signup_diner,
    signupCook,
    signupDiner
}