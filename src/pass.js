'use strict';

const process = require('process');

module.exports = () => {
  process.stdout.write('\x1b[32m.\x1b[0m');
};
