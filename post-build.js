require('dotenv').config();
const fs = require('fs');

const vers = {
    version: process.env.REACT_APP_VERSION
};

fs.writeFileSync('./build/version.json', JSON.stringify(vers, null, 2));

console.log('[POST-BUILD] version file created');
