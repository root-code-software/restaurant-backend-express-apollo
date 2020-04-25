const { responseVerificationResend, responseVerificationConfirm } = require('../../../server/services');

module.exports = {
    resend_verification: async (_, { input }) => {
        return await responseVerificationResend(input);
    },
    verify_signup_diner: async (_, {input}) =>{
        return await responseVerificationConfirm(input);
    }
}