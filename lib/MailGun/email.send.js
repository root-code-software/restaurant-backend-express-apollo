const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

module.exports = async (data)=>{
    try {
        await mg.messages().send(data, async function (error, _body) {
            if (error) { throw Error(error) };
        });
        return {msg: 'Mailgun have the email in queue'}
    } catch (error) {
        return { error: error.message, msg: 'There was a problem with Mailgun' }
    }
}