const bcrypt = require('bcryptjs');

const { findByEmail } = require('../../database/postgREST/user');



const validateInput = async (email, password) => {
    try {
        let user = await findByEmail(email.toLowerCase())

        if (!user) {
            throw new Error('No user can be found in DB with the email you provided.');
        }

        let isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            throw new Error('The password you gave was incorrect. Plase Check for misspelling.');
        }

        return { user }
    } catch (error) {
        console.error({ message: error.message, trace: error });
        return { error: error.message }
    }
};

module.exports = {
    validateInput
};