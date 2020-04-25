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
                        cook {
                          cook_disabled
                          cook_id
                          cook_paused
                          cook_reviews {
                            stars
                            comment
                            disabled
                            user_id
                          }
                          cook_verified
                          last_payment_method
                          last_payoff_method
                          preferred_payment
                          promo_code
                        }
                        email
                        first_name
                        is_cook_locked
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

    console.log(user, response)
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

    if (error) {
      return {
        ...responseMsgs[401],
        errors: [
          {
            description: responseMsgs[401].errors[0].description,
            url: responseMsgs[401].errors[0].url,
            msg: error
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
    return {
      ...responseMsgs[200],
      msg: "user login successfully. Check your level of autorization Please.",
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
