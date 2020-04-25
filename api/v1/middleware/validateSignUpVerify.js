const { check } = require('express-validator/check');

module.exports = () => {
    return [ 
        check('email').exists()
        .withMessage('email field is required')
        .isEmail(),
        check('verificationCode').exists()
        .withMessage('Enter the verification code we sent to your email')
       ] 
};