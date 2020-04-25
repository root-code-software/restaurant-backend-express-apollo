const { verify } = require('../util/token');

const tokenVerification = async (req, res, next) => {

    try {
        const token = req.headers['cookinat-api-jwt'];

        const apiKey = req.headers['cookinat-api-key'];

        if (apiKey === '7369687b7f76767b7d6f7b745a7d777b737634797577') {
            return next()
        }

        if (!token) {
            return res.status(401).json({
                sucess: false,
                msg: 'No token provided',
                errors: [{
                    "msg": 'No token provided'
                }]
            });
        }
        try {
            const decoded = verify(token)
            console.error(decoded);
            if (decoded.iat < 1000) {
                return res.status(401).json({
                    sucess: false,
                    msg: 'Your Token has expired',
                    errors: [{
                        "msg": 'Your token time has reached nearly zero seconds'
                    }]
                });
            }
            if (decoded.role_id === 'none') {
                return res.status(401).json({
                    sucess: false,
                    msg: 'Your did not validated your account.',
                    errors: [{
                        "msg": 'We determined that you have not made the proper steps to validate your account. Please refer to your email to find a Validate Code.'
                    }]
                });
            }
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                msg: 'Invalid Token',
                errors: [{
                    "msg": 'Invalid Token',
                    error
                }]
            });
        };
        return next();
    } catch (error) {
        console.log(error)
    }

}

module.exports = tokenVerification;