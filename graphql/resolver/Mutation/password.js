const { responsePasswordChange, responsePasswordReset } = require('../../../server/services');

module.exports = {
    change_password: async (_, { input }) => {
		return await responsePasswordChange(input);
	},
	reset_password: async (_, { input }) => {
		return await responsePasswordReset(input);
	}
}