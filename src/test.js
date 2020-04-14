'use strict';

const process = require('process');

/**
 * A basic test
 * @param {string} name - The name of the test
 * @param {function} test - The function that contains the test
 */
const it = (name, test) => {
  try {
    test();
    process.stdout.write('\x1b[32m.\x1b[0m');
  }
  catch(e) {
    process.stdout.write(`\n${name}\n`);
    process.stdout.write(`${e}\n`);
    process.stdout.write('\x1b[31mx\x1b[0m');
  }
};

module.exports = {
  it
};
