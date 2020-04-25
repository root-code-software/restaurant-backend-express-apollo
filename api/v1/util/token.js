const jwt = require('jsonwebtoken');

const { privateKey, publicKey } = require('../../../util/keys');

module.exports = {
    sign: (payload) => {
        // SIGNING OPTIONS
        const signOptions = {
            issuer: 'CookinAt Inc',
            audience: 'www.cookinat.com/api',
            expiresIn: "12h",
            algorithm: "RS256"
        };
        const token = jwt.sign(payload, privateKey, signOptions);
        return token;
    },
    verify: (token) => {
        const verifyOptions = {
            issuer: 'CookinAt inc.',
            audience: 'www.cookinat.com/api',
            expiresIn: "12h",
            algorithms: ["RS256"]
        };
        try {            
            const legit = jwt.verify(token, publicKey, verifyOptions);
            return legit;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true, json: true});
        //returns null if token is invalid
     }
}