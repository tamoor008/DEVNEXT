const fs = require('fs');
function analyze(filename) {
  if (!fs.existsSync(filename)) return 'not found';
  return fs.statSync(filename).size + ' bytes';
}
console.log('hero-mockup:', analyze('public/hero-mockup.png'));
console.log('iphone-frame-test:', analyze('public/iphone-frame-test.png'));
