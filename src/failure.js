'use strict';

const process = require('process');

module.exports = (testName, e) => {
  process.stdout.write(`\n${testName}\n`);
  process.stdout.write(`${e}\n`);
  process.stdout.write('\x1b[31mx\x1b[0m');
};
