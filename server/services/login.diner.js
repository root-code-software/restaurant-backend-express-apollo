const { sign } = require("../../lib/jsonwebtoken");
const responseMsgs = require("../util/responseMessages");
const bcrypt = require("bcryptjs");
const fetchql = require("../../lib/fetchql");

const validateInput = async (email, password) => {
  try {
    const operationName = "users_aggregate";
    const query = `
            query users_aggregate($email: String) {
                users_aggregate(where: {email: {_eq: $email}}) {
                    nodes {
                        avatar
                        email
                        first_name
                        last_name
                        nickname
                        notification {
                          alerts_email
                          alerts_sms
                          messages_email
                          messages_sms
                          notification_id
                          promotions_email
                          promotions_sms
                          push_notification
                          updated_at
                          updates_notification
                        }
                        updated_at
                        is_diner_locked
                        diner {
                          city
                          diner_additional_info
                          diner_verified
                          favourite_food
                          preferred_payment
                          promo_code
                          self_description
                          state
                          updated_at
                        }
                        password
                        user_id
                      }
                    }
                  }
        `;

    const variables = { email };
    let response = await fetchql(operationName, query, variables);
    if (response.error) {
      throw new Error(response.error);
    }
    const user = response[operationName].nodes;

    if (Array.isArray(user) && user.length == 0) {
      throw new Error("no user found");
    }

    let isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      throw new Error("The password you gave was incorrect. Plase Check for misspelling.");
    }
    return { user };
  } catch (error) {
    console.error({ message: error.message, trace: error });
    return { error: error.message };
  }
};

module.exports = async ({ email, password }) => {
  try {
    let { user, error } = await validateInput(email, password);
    if ( error) {
      return {
        ...responseMsgs[401],
        msg: 'There was a problem validating your account.',
        errors: [
          {
            description: responseMsgs[401].errors[0].description,
            url: responseMsgs[401].errors[0].url,
            msg: error
          }
        ]
      };
    }
    if (user[0].is_diner_locked ) {
      return {
        ...responseMsgs[403],
        msg: 'When checking if you are locked, we found you are.',
        errors: [
          {
            description: responseMsgs[403].errors[0].description,
            url: responseMsgs[403].errors[0].url,
            msg: 'You have not activated your account. Please check your email for the validation code.'
          }
        ]
      };
    }
    let token = sign({
      user_id: user[0].user_id,
      email,
      "https://www.cookinat.com/jwt/claims": {
        "x-hasura-allowed-roles": ['admin'],
        "x-hasura-default-role": "admin",
        "x-hasura-user-id": user[0].user_id
      }
    });
    // var twilio_token = generate(user[0].user_id, 'chat')
    return {
      ...responseMsgs[200],
      msg: "user login successfully. Check your level of autorization.",
      data: [
        {
          user: JSON.stringify({...user[0], password: undefined}),
          token,
          token_expires: "12h"
        }
      ]
    };
  } catch (error) {
    console.error(error);
    return {
      ...responseMsgs[500],
      errors: [
        {
          description: responseMsgs[500].errors[0].description,
          url: responseMsgs[500].errors[0].url,
          msg: error.message,
          trace: error.trace
        }
      ]
    };
  }
};
