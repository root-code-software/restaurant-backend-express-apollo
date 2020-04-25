const { body } = require('express-validator/check')

module.exports = () => (
    [
        body('last_name')
            .withMessage('Last Name field is required')
            .isLength({ min: 3 })
            .withMessage('surname must be greater than 3 letters'),
        body('first_name')
            .withMessage('First Name field is required')
            .isLength({ min: 3 })
            .withMessage('name must be greater than 3 letters'),
        body('email')
            .exists()
            .withMessage('email field is required')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .exists()
            .withMessage('password field is required')
            .isLength({ min: 6 })
            .withMessage('password must be greater than 6'),
        body('phone_number')
            .isString(),
        body('ssn')
            .isString(),
        body('certification_photo')
            .isURL()
            .withMessage('Must provide the Certification Photo as a valid URL')
    ]
);