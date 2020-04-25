const bcrypt = require("bcryptjs");
const fetchql = require("../../lib/fetchql");
const responseMsgs = require("../util/responseMessages");

const sendEmail = require("../../lib/MailGun/email.send");

module.exports = async ({ email, password }) => { //TODO: Check the old password
  try {
    if (password) {
      const get_user = "get_user";
      const get_user_query = `
            query get_user($email: String) {
                users(where: {email: {_eq: $email}}) {
                      updated_at
                      password
                      first_name
                      last_name
                      nickname
                      avatar
                      phone_number
                    }
                  }
        `;

      const get_user_variables = { email };
      let response = await fetchql(get_user, get_user_query, get_user_variables);
      const [user, error] = [response, response.error];

      if (Array.isArray(user) && user.length == 0) {
        return {
          ...responseMsgs[404],
          errors: [
            {
              msg: "email not found on Database. After search in DB no user with that email found"
            }
          ]
        };
      }

      const userDB = {
        email,
        first_name: user["users"][0].first_name,
        last_name: user["users"][0].last_name,
        nickname: user["users"][0].nickname,
        avatar: user["users"][0].avatar,
        phone_number: user["users"][0].phone_number
      };
      await bcrypt.genSalt(10, async function(err, salt) {
        if (err) {
          console.log(err);
          throw new Error("bcrypt genSalt", err);
        }
        await bcrypt.hash(password, salt, async (err, hashedPassword) => {
          if (err) {
            throw new Error("bcrypt Hash", err.message);
          }

          const update_users = "update_users";
          const update_users_query = `
            mutation update_users($email: String, $password: String) {
              update_users(where: {email: {_eq: $email}}, _set: {password: $password}) {
                returning {
                  email
                  first_name
                  last_name
                  nickname
                  diner_id
                }
              }
            }
            
          `;

          const update_users_variables = {
            email,
            password: hashedPassword
          };
          let response = await fetchql(update_users, update_users_query, update_users_variables);
          if (response.error) {
            throw new Error(response.error);
          }

          if (response[update_users].returning.length > 0) {
            const from_who = process.env.FROM_WHO_EMAIL;
            const data = {
              from: from_who,
              to: email,
              subject: " You have changed password successfully!",
              text: "Now you can Enter in CookinAt App with your new password"
            };
            const { error } = await sendEmail(data);
            if (error) {
              throw Error("There was a problem sending Email.\n" + error);
            }
            console.log("Completed request:\n", userDB)
          } else {
            throw Error(
              "There was a problem Activating your account even if the code sent is good, please call on support for this one: \n" +
                error
            );
          }
        });
      });
      return {
        ...responseMsgs[202],
        data: [userDB]
      };
    } else {
      return responseMsgs[403];
    }
  } catch (error) {
    console.error(error);
    return {
      ...responseMsgs[500],
      errors: [{ error: error.message, trace: error.trace }]
    };
  }
};
