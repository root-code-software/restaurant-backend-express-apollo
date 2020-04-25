const bcrypt = require("bcryptjs");
const fetchql = require("../../lib/fetchql");
const responseMsgs = require("../util/responseMessages");
const chatkit = require("../../lib/ChatKit");

const sendEmail = require("../../lib/MailGun/email.send");

module.exports = async input => {
  try {
    let {
      email,
      password,
      first_name,
      middle_name,
      last_name,
      nickname,
      avatar,
      phone_number,
      mother_maiden_name,
      dob,
      ssn,
      is_external
    } = input;

    const operationName = "users_aggregate";
    const query = `
            query users_aggregate($email: String) {
                users_aggregate(where: {email: {_eq: $email}}) {
                    nodes {
                      email
                      diner_id
                      cook_id
                      }
                    }
                  }
        `;

    const variables = { email };
    let responseDB = await fetchql(operationName, query, variables);

    if (responseDB.error) {
      throw new Error(responseDB.error);
    }
    const userDB = responseDB[operationName].nodes;

    let userData = {
      email,
      first_name,
      middle_name,
      last_name,
      nickname,
      avatar,
      phone_number,
      mother_maiden_name,
      dob,
      ssn
    };

    if (userDB.length > 0 && userDB[0].cook_id) {
      return {
        ...responseMsgs[409],
        errors: [
          {
            msg:
              "That email have a cook account. Please use another email to create a new cook or enter with your last cook account. Also is posible that your account is not verified by an Admin.",
            trace: "v1/auth/postSignUpCook mg.message callback"
          }
        ]
      };
    }

    const cookinatEmail = process.env.FROM_WHO_EMAIL;
    var data = {
      from: email.toLowerCase(),
      to: cookinatEmail,
      subject: "Cook Admission Request",
      text: "After SignUp for CookinAt, the next user is requested a cook position:\n" + JSON.stringify(userData)
    };

    await bcrypt.genSalt(10, async function(err, salt) {
      try {
        if (err) {
          // TODO: Add a try catch here
          console.log(err);
          throw new Error("bcrypt genSalt", err);
        }

        await bcrypt.hash(password, salt, async (err, hashedPassword) => {
          try {
            if (err) {
              throw new Error("bcrypt Hash", err.message);
            }

            if (userDB.length > 0 && userDB[0].diner_id) {
              const insert_cooks = "insert_cooks";
              const insert_cooks_query = `
            mutation insert_cooks( $middle_name: String, $mother_maiden_name: String, $dob: String, $ssn: String ) {
              insert_cooks(objects: {cook_verified: false, middle_name: $middle_name, mother_maiden_name: $mother_maiden_name, dob: $dob, ssn: $ssn }) {
                returning {
                  created_at
                  cook_id
                }
              }
            }
            
          `;

              const insert_cooks_variables = {
                middle_name,
                mother_maiden_name,
                dob,
                ssn
              };
              let cook = await fetchql(insert_cooks, insert_cooks_query, insert_cooks_variables);
              if (cook.error) {
                throw new Error(cook.error);
              }

              const update_users = "update_users";
              const update_users_query = `
            mutation update_users($email: String, $cook_id: uuid) {
              update_users(where: {email: {_eq: $email}}, _set: {cook_id: $cook_id}) {
                returning {
                  email
                  first_name
                  last_name
                  nickname
                  cook_id
                }
              }
            }
            
          `;

              const update_users_variables = {
                email,
                cook_id: cook[insert_cooks].returning[0].cook_id
              };
              let response = await fetchql(update_users, update_users_query, update_users_variables);
              if (response.error) {
                throw new Error(response.error);
              }
              console.log(response[update_users].returning);
            } else {
              let chatkit_id = userData.email;
              chatkit
                .createUser({
                  id: userData.email,
                  name: userData.first_name + " " + userData.last_name
                })
                .then(resp => {
                  chatkit_id = resp.id;
                })
                .catch(err => {
                  console.log(err);
                });

              const operationName = "insert_users";
              const query = `
            mutation insert_users($chatkit_id: String, $email: String, $middle_name: String, $mother_maiden_name: String, $dob: String, $ssn: String, $password: String, $first_name: String, $last_name: String, $nickname: String, $avatar: String, $phone_number: String) {
              insert_users(objects: {chatkit_id: $chatkit_id,email: $email, first_name: $first_name, last_name: $last_name, nickname: $nickname, avatar: $avatar, phone_number: $phone_number, password: $password, cook: {data: {ssn: $ssn, middle_name: $middle_name, mother_maiden_name: $mother_maiden_name, dob: $dob}}}) {
                returning {
                  email
                }
              }
            }
          `;

              const variables = {
                mother_maiden_name,
                dob,
                email,
                first_name,
                middle_name,
                last_name,
                nickname,
                avatar,
                phone_number,
                ssn,
                chatkit_id,
                password: hashedPassword
              };

              let response = await fetchql(operationName, query, variables);
              if (response.error) {
                throw new Error(response.error);
              }
              // console.log(response[operationName].returning);
              
            }
          } catch (error) {
            console.error("catch:\n", error);
            throw new Error("bcrypt:\n", error.message);
          }
        });

        if (!is_external){
          const { msg, error } = await sendEmail(data);
          if (msg) console.log("email: \n", msg);
          if (error) {
            throw Error("There was a problem sending verification code, please call on support for this one: \n" + error);
          }
        }

      } catch (error) {
        throw Error({ error: error.message, trace: error.trace });
      }
    });
    return {
      ...responseMsgs[202],
      msg: "user signup processing. Check your email for more info.",
      data: [userData]
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
