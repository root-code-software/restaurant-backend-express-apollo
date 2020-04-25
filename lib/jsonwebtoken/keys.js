const fs = require('fs');

const privateKey = fs.readFileSync('./server/jwtRS256.key', 'utf8');
const publicKey = fs.readFileSync('./server/jwtRS256.key.pub', 'utf8');

module.exports = {
  privateKey,
  publicKey,
};
