#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');

program
  .version('0.1.0')
  .option('-i, --init', 'init app')
  .parse(process.argv);

const createFolder = (folderName) => {
  const address = path.join(process.cwd(), folderName);
  if (!fs.existsSync(address)) {
    fs.mkdirSync(address);
  }
};

if (program.init) {
  createFolder('src-app');
  createFolder('src-components');
  createFolder('src-modules');
  // fs.copyFileSync(path.join(__dirname, './resource/scripts/pkg.js'), 'src-app/pkg.js');
  // fs.copyFileSync(path.join(__dirname, './resource/scripts/pkg.js'), 'src-components/pkg.js');
  // fs.copyFileSync(path.join(__dirname, './resource/scripts/pkg.js'), 'src-modules/pkg.js');
  fs.writeFileSync(path.join(process.cwd(), 'src-app/test.js'), 'var a = 1;');
}
