const { param } = require('express-validator/check');

const validateEmailInParam = () => {
    return [ 
        param('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid')
       ] 
};

module.exports = validateEmailInParam;