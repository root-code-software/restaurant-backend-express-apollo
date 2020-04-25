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
                    }
                }
            `;

  const variables = { ...input };
  let response = await fetchql(operationName, query, variables);
  const [user, error] = [response[operationName], response.error];
  return [user, error];
};
module.exports = async ({ verification_code, email }) => {
  try {
    if (verification_code) {
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

      const decoder = decrypt(process.env.SECRET_KEY);
      const code = decoder(verification_code);
      const verifyMe = code.split(",");

      if (email.toLowerCase() === verifyMe[0]) {
        const operationName = 'update_users';
        const query = `
          mutation update_users($email: String) {
            update_users(where: {email: {_eq: $email}}, _set: {is_diner_locked: false}) {
              returning {
                is_diner_locked
                first_name
                email
              }
            }
          }
        `;
        const variables = { email };
        let response = await fetchql(operationName, query, variables);
        const [user, errorDB] = [response[operationName].returning, response.error];

        if (errorDB) {
          throw new Error(errorDB);
        }
        console.log(user);
        if (user) {
          const from_who = process.env.FROM_WHO_EMAIL;
          const data = {
            from: from_who,
            to: email,
            subject: user[0].first_name + " Your Account is Activated successfully!",
            text: "Now you can Enter in CookinAt App"
          };

          const { error } = await sendEmail(data);
          try {
            if (error) {
              throw Error("There was a problem sending verification code, please call on support for this one: \n" + error);
            }
          } catch (error) {
            console.error(error);
            return {
              ...responseMsgs[500],
              errors: [{ error: error.message, trace: "verification.confirm mg.message callback" }]
            };
          }

          return responseMsgs[202];
        } else {
          throw Error(
            "There was a problem Activating your account even if the code sent is good, please call on support for this one: \n" +
              error
          );
        }
      } else {
        return {
          ...responseMsgs[400],
          errors: [
            {
              ...responseMsgs[400].errors[0],
              msg: "Verification Code is incorrect. Please verify in your email if is the same."
            }
          ]
        };
      }
    } else {
      return responseMsgs[403];
    }
  } catch (error) {
    console.error(error);
    return {
      ...responseMsgs[500],
      errors: [{ msg: error.message, trace: error.trace }]
    };
  }
};
