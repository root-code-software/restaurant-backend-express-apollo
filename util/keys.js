const fs = require('fs');

const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');
const publicKey = fs.readFileSync('./jwtRS256.key.pub', 'utf8');

module.exports = {
  privateKey,
  publicKey,
};
