const bcrypt = require("bcryptjs");
const fetchql = require("../../lib/fetchql"); //TODO: Add updateUser
const responseMsgs = require("../util/responseMessages");

const sendEmail = require("../../lib/MailGun/email.send");

function makeOTP(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNPRSTUVWXYZabcdefghjkmpqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = async ({ email }) => {
  try {
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

    const OTP = makeOTP(6);
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        throw new Error("bcrypt genSalt", err);
      }
      bcrypt.hash(OTP, salt, async (err, hashedPassword) => {
        if (err) {
          throw new Error("bcrypt Hash", err);
        }
        const update_users = "update_users";
          const update_users_query = `
            mutation update_users($email: String, $password: String) {
              update_users(where: {email: {_eq: $email}}, _set: {password: $password}) {
                returning {
                  email
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
          console.log("Password changed for ", email)
      });
    });

    const from_who = process.env.FROM_WHO_EMAIL;

    var data = {
      from: from_who,
      to: email.toLowerCase(),
      subject: "Now you can reset your password",
      text:
        "Here is your One Time Password (OTP) for CookinAt Log In:\n" +
        OTP +
        "\n Please take into account that your last password is lost. \n" +
        "You must change this password to one of your choice inside the app."
    };

    const { errorEmail } = await sendEmail(data);
    if (errorEmail) {
      throw Error("There was a problem sending Email.\n" + errorEmail);
    }

    return {
      ...responseMsgs[202],
      msg: "We sent you OTP to set a new password to your mail",
      data: [userDB]
    }
  } catch (error) {
    return {
      ...responseMsgs[500],
      errors: [{ error: error.message, trace: error.trace }]
    }
  }
};
