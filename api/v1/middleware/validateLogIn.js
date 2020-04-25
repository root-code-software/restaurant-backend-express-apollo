const { body } = require('express-validator/check');

const validateLogIn = () => {
    return [ 
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 6})
        .withMessage('password must be greater than 6')
       ] 
};

module.exports = validateLogIn;