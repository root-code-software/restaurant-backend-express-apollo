const accountSid = process.env.TWILIO_SID;
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

module.exports = (body, to)=>{
    client.messages
    .create({body, from: '+15017122661', to})
    .then(message => console.log(message.sid));
};