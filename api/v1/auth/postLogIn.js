const { validationResult } = require('express-validator/check');
const { validateInput } = require('../../../action/user/login');
const { sign } = require('../../../lib/JSONWebToken/token');
const responseMsgs = require('../util/responseMessages');

module.exports = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(req.body)
        return res.status(422).json({
            ...responseMsgs[422],
            errors: errors.array()
        });
    }
    const { email, password } = req.body

    try {
        let { user, error } = await validateInput(email, password)
        if (error) {
            return res.status(401).json({
                ...responseMsgs[401],
                errors: [{
                    ...responseMsgs[401].errors[0],
                    msg: error
                }]
            })
        }

        // TODO: check if user exposes role_id to use in token
        let token = sign({ email })
        return res.status(200).json({
            ...responseMsgs[200],
            msg: "user login successfully. Check your level of autorization.",
            data: [{
                email: email.toLowerCase(),
                token,
                tokenExpires: '1d',
                is_cook_locked: user[0].is_cook_locked,
                is_diner_locked: user[0].is_diner_locked,
                user_id: user[0].user_id,
                first_name: user[0].first_name
            }]
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};