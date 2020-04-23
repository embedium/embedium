'use strict';

const mach = require('mach.js');
const proxyquire = require('proxyquire');

const f = mach.mockFunction('f');
const stdout = mach.mockObject({
  write: () => {}
});

const test = proxyquire('../src/Test.js', {
  'process': { stdout }
});

const nothingShouldHappen = () => {
  return mach.mockFunction('').mayBeCalled();
};

describe('test', () => {
  it('should run a test and print a period for success', () => {
    f.shouldBeCalledWith()
      .andThen(stdout.write.shouldBeCalledWith('\x1b[32m.\x1b[0m'))
      .when(() => {
        test.it('', f);
      });
  });

  it('should print the name of the test when there is a failure and the error it threw', () => {
    f.shouldBeCalledWith().andWillThrow('test failed for x reason')
      .andThen(stdout.write.shouldBeCalledWith('\ntest name\n'))
      .andThen(stdout.write.shouldBeCalledWith('test failed for x reason\n'))
      .andThen(stdout.write.shouldBeCalledWith('\x1b[31mx\x1b[0m'))
      .when(() => {
        test.it('test name', f);
      });
  });

  it('should add the describe to the test name for failures', () => {
    f.shouldBeCalledWith().andWillThrow('test failed for x reason')
      .andThen(stdout.write.shouldBeCalledWith('\na description test name\n'))
      .andThen(stdout.write.shouldBeCalledWith('test failed for x reason\n'))
      .andThen(stdout.write.shouldBeCalledWith('\x1b[31mx\x1b[0m'))
      .when(() => {
        test.describe('a description', () => {
          test.it('test name', f);
        });
      });
  });

  it('should handle nested describes', () => {
    f.shouldBeCalledWith().andWillThrow('test failed for x reason')
      .andThen(stdout.write.shouldBeCalledWith('\na description another description test name\n'))
      .andThen(stdout.write.shouldBeCalledWith('test failed for x reason\n'))
      .andThen(stdout.write.shouldBeCalledWith('\x1b[31mx\x1b[0m'))
      .when(() => {
        test.describe('a description', () => {
          test.describe('another description', () => {
            test.it('test name', f);
          });
        });
      });
  });

  it('should remove describes after the block is completed', () => {
    nothingShouldHappen()
      .when(() => {
        test.describe('a description', () => {});
      });

    f.shouldBeCalledWith().andWillThrow('test failed for x reason')
      .andThen(stdout.write.shouldBeCalledWith('\ntest name\n'))
      .andThen(stdout.write.shouldBeCalledWith('test failed for x reason\n'))
      .andThen(stdout.write.shouldBeCalledWith('\x1b[31mx\x1b[0m'))
      .when(() => {
        test.it('test name', f);
      });
  });
});
