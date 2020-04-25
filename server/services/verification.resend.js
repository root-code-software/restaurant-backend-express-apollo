const { encrypt } = require("salteen");
const { decrypt } = require("salteen");
const responseMsgs = require("../util/responseMessages");

const fetchql = require("../../lib/fetchql");

const sendEmail = require("../../lib/MailGun/email.send");

const graphqlQuery = async input => {
  const operationName = "users";
  const query = `
                query users($email: String) {
                    users(where: {email: {_eq: $email}})  {
                        email
                        is_diner_locked
                        first_name
                    }
                }
            `;

  const variables = { ...input };
  let response = await fetchql(operationName, query, variables);
  const [user, error] = [response[operationName], response.error];
  return [user, error];
};
module.exports = async ({ email }) => {
  try {
    const [userDB, errorDB] = await graphqlQuery({ email });

    if (errorDB) {
      throw new Error(errorDB[1]);
    }

    if (Array.isArray(userDB) && userDB.length == 0) {
      return res.status(404).json({
        ...responseMsgs[404],
        errors: [
          {
            msg: "email not found. After search in DB no user with that email found"
          }
        ]
      });
    }
    if (!userDB[0].is_diner_locked) {
      return {
        ...responseMsgs[409],
        errors: [
          {
            ...responseMsgs[409].errors[0],
            msg: "User Already verified."
          }
        ]
      };
    }

    let encripter = encrypt(process.env.SECRET_KEY);
    const verificationCode = encripter(`${email},${Math.random()}`);

    const data = {
      from: process.env.FROM_WHO_EMAIL,
      to: email.toLowerCase(),
      subject: userDB[0].first_name + " use this code to verify your account!",
      text: "Here is your verification code for CookinAt Sign Up:\n" + verificationCode
    };
    const { error } = await sendEmail(data);
    if (error) {
      throw Error("There was a problem sending Ok Email, but you can enter App normally.\n" + error);
    }

    return {
      ...responseMsgs[201],
      msg: `${userDB[0].first_name} Check your email for your verification code for the next step, now you can enter to Log In`
    };
  } catch (error) {
    console.error(error);
    return {
      ...responseMsgs[500],
      errors: [{ error: error.message, trace: error.trace }]
    };
  }
};
