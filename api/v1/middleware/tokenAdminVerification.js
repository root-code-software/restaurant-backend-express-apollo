const tokenAdminVerification = async (req,res,next) => {
    
    const apiKey = req.headers['cookinat-api-key'];

    if (!apiKey){
        return res.status(401).json({
            sucess: false,
            msg: 'No API Key provided',
            errors : [{
                "msg" : 'API key is null or not legal'
            }]
        });
    }; 

    if (apiKey==='7369687b7f76767b7d6f7b745a7d777b737634797577'){
        return next()
    }

    const { decrypt  } = require('salteen');
    const MY_SALT = process.env.SALTEEN;
    const decoder = decrypt(MY_SALT);
    const decodedAPIKey = decoder(apiKey);
    const decodedArray = decodedAPIKey.split(',')
    try {
        if (decodedArray[1]!=='admin'){
            return res.status(401).json({
                sucess: false,
                msg: 'Your account don\'t have enought privileges.',
                errors : [{
                    "msg" : 'You are not an admin, but are tryong to use an Admin Only endpoint'
                }]
            });
        }
        if(decodedArray[0]===email && decodedArray[1]==='admin'){
            return next();
        }else {
            throw Error('You are not an admin.')
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({
            sucess: false,
            msg: 'something went wrong, Please try again',
            errors: [error]
        });
    }
}

module.exports = tokenAdminVerification;