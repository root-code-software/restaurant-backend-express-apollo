const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH;
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


console.log('twilio',accountSid)

module.exports = (body, to)=>{
    client.messages
    .create({body, from: '+15017122661', to})
    .then(message => console.log(message.sid));
};