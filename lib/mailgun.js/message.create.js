var mailgun = require('mailgun.js');
var mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

module.exports = async (data)=>{
    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            data
            // from: "Excited User <mailgun@sandbox-123.mailgun.org>",
            // to: ["test@example.com"],
            // subject: "Hello",
            // text: "Testing some Mailgun awesomness!",
            // html: "<h1>Testing some Mailgun awesomness!</h1>"
          })
          .then(msg => {
              console.log(msg)
            return msg
            }) // logs response data
          .catch(error => {throw Error(error.message)}); // logs any error
          
        return response
    } catch (error) {
        console.log(error)
        return { error: error.message, msg: 'There was a problem with Mailgun' }
    }
}