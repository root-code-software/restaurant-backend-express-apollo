const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://8d6abe9c8fa54853ab5b5557adbf1bf6@sentry.io/1764530' });
// https://know-thy-code.com/sentry-io-using-node-js/
module.exports = Sentry;