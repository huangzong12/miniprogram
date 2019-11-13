const path = require('path');
const { exec } = require('child_process');

const gulpConfig = path.resolve(__dirname, './compiler.js');

const p = exec(`npx gulp -f ${gulpConfig} buildSrc --color`);
p.stdout.on('data', stdout => console.info(stdout));
p.stderr.on('data', stderr => console.info(stderr));
