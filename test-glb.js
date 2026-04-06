const fs = require('fs');
const contents = fs.readFileSync('public/iphone14.glb');
const stringContents = contents.toString('utf-8');
const match = stringContents.match(/{"name":"([^"]+)"/g);
console.log([...new Set(match)]);
