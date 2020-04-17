'use strict';

const process = require('process');

const describes = [];

/**
 * A basic test
 * @param {string} description - The description of the test
 * @param {function} test - The function that contains the test
 */
const it = (description, test) => {
  try {
    test();
    process.stdout.write('\x1b[32m.\x1b[0m');
  }
  catch(e) {
    process.stdout.write(`\n${describes.join(' ')}${describes.length > 0 ? ' ' : '' }${description}\n`);
    process.stdout.write(`${e}\n`);
    process.stdout.write('\x1b[31mx\x1b[0m');
  }
};

/**
 * A block of tests
 * @param {string} description - The description of the block
 * @param {function} block - The block of tests
 */
const describe = (description, block) => {
  describes.push(description);
  block();
  describes.pop();
};

module.exports = {
  it,
  describe
};
