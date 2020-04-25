const { responseLoginDiner, responseLoginCook } = require('../../../server/services');

module.exports = {
    loginDiner: async (_, { input }) => {
        const {
            email,
            password
        } = input;

        const loginResponse = await responseLoginDiner({
            email,
            password
        });        
        return loginResponse;
    },
    loginCook: async (_, { input }) => {
        const {
            email,
            password
        } = input;

        const loginResponse = await responseLoginCook({
            email,
            password
        });
        return loginResponse;
    }
}