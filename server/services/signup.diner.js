const bcrypt = require("bcryptjs");
const { encrypt } = require("salteen");
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
      last_name, 
      nickname, 
      avatar, 
      phone_number,
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
                        first_name
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
    

    if (userDB.length > 0 && userDB[0].diner_id) {
      return {
        ...responseMsgs[409],
        errors: [
          {
            msg:
              "That email have a diner account. Please use another email to create a new diner or enter with your last diner account",
            trace: "v1/auth/postSignUpCook mg.message callback"
          }
        ]
      };
    }

    let encripter = encrypt(process.env.SECRET_KEY);
    const verificationCode = encripter(`${email},${Math.random()}`);

    var data = {
      from: process.env.FROM_WHO_EMAIL,
      to: email.toLowerCase(),
      subject: "Just one more step!",
      text: "Here is your verification code for CookinAt Sign Up:\n" + verificationCode
    };

    const userData = {
      email,
      first_name,
      last_name,
      nickname,
      avatar,
      phone_number, 
      verificationCode
    };
    await bcrypt.genSalt(10, async function(err, salt) {
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

          if (userDB.length > 0 && userDB[0].cook_id) {
            const insert_diner = "insert_diners";
            const insert_diner_query = `
            mutation insert_diners($email: String, $password: String, $first_name: String, $last_name: String, $nickname: String, $avatar: String, $phone_number: String) {
              insert_diners(objects: {diner_verified: false}) {
                returning {
                  created_at
                  diner_id
                  first_name
                }
              }
            }
            
          `;

            const insert_diner_variables = {
              email,
              first_name,
              last_name,
              nickname,
              avatar,
              phone_number,
              password: hashedPassword
            };
            let diner = await fetchql(insert_diner, insert_diner_query, insert_diner_variables);
            if (diner.error) {
              console.log('diner.error', diner.error);
              throw new Error(diner.error);
            }

            const update_users = "update_users";
            const update_users_query = `
            mutation update_users($email: String, $diner_id: uuid) {
              update_users(where: {email: {_eq: $email}}, _set: {diner_id: $diner_id}) {
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
              diner_id: diner[insert_diner].returning[0].diner_id
            };
            let response = await fetchql(update_users, update_users_query, update_users_variables);
            if (response.error) {
              console.log('response.error', response.error);
              throw new Error(response.error);
            }
          } else {
            let chatkit_id = "";
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
            mutation insert_users($chatkit_id: String, $email: String, $password: String, $first_name: String, $last_name: String, $nickname: String, $avatar: String, $phone_number: String) {
              insert_users(objects: {chatkit_id: $chatkit_id, email: $email, first_name: $first_name, last_name: $last_name, nickname: $nickname, avatar: $avatar, phone_number: $phone_number, password: $password, diner: {data: {diner_verified: false}}}) {
                returning {
                  email
                  first_name
                  last_name
                  nickname
                  diner_id
                  created_at
                }
              }
            }
            
          `;

            const variables = {
              email,
              first_name,
              last_name,
              nickname,
              avatar,
              phone_number,
              chatkit_id,
              password: hashedPassword
            };
            let response = await fetchql(operationName, query, variables);
            if (response.error) {
              console.log('response.error', response.error);
              throw new Error('response.error',response.error);
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
    });
    console.log(userData)
    return {
      ...responseMsgs[202],
      msg: "user signup successfully. Check your email for your verification code for the next step.",
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
