const { responseSignupCook, responseSignUpDiner } = require('../../../server/services');
// const logger = require('../../../util/logger');
module.exports = {
    signupCook: async (_, { input }) => {

        return await responseSignupCook(input);
    },
    signupDiner: async (_, { input }) => {
        return await responseSignUpDiner(input);
    }
}