'use strict';

const pass = require('./pass');
const failure = require('./failure');

module.exports = () => {
  let tests = [];

  return {
    addTest: (test) => {
      tests.push(test);
    },
    runTests: () => {
      for(let test of tests) {
        try {
          test.test();
          pass();
        } catch(e) {
          failure(test.name, e)
        }
      }
    }
  }
};
