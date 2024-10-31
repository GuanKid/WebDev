const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.resolve(__dirname, '../../.env');

function generateJwtSecret() {
  return crypto.randomBytes(64).toString('hex');
}

function updateEnvFile(key, value) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  const regex = new RegExp(`^${key}=.*$`, 'm');
  
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    envContent += `\n${key}=${value}`;
  }

  fs.writeFileSync(envPath, envContent);
}

function setupEnvironment() {
  require('dotenv').config({ path: envPath });

  if (!process.env.JWT_SECRET) {
    const newSecret = generateJwtSecret();
    updateEnvFile('JWT_SECRET', newSecret);
    process.env.JWT_SECRET = newSecret;
  }
}

module.exports = { setupEnvironment };