'use strict';

module.exports = (testRunner) => {
  const describes = [];

  /**
   * A basic test
   * @param {string} description - The description of the test
   * @param {function} test - The function that contains the test
   */
  const it = (description, test) => {
    testRunner.addTest({
      name: `${describes.join(' ')}${describes.length > 0 ? ' ' : '' }${description}`,
      test
    });
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

  return {
    it,
    describe
  };
}
