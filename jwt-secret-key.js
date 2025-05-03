const crypto = require('crypto');

// Generate a secure random string of 64 bytes
const jwtSecretKey = crypto.randomBytes(64).toString('hex');

console.log('Your JWT Secret Key:', jwtSecretKey);
