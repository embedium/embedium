'use strict';

describe('TestRunner', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const pass = mach.mockFunction('pass');
  const failure = mach.mockFunction('failure');
  const test1 = mach.mockFunction('test1');
  const test2 = mach.mockFunction('test2');

  const TestRunner = proxyquire('../src/TestRunner', {
    './pass': pass,
    './failure': failure
  });

  it('should run a single test', () => {
    const testRunner = TestRunner();
    testRunner.addTest({ test: test1 });

    test1.shouldBeCalledWith()
      .andThen(pass.shouldBeCalledWith())
      .when(() => {
        testRunner.runTests();
      });
  });

  it('should run multiple tests', () => {
    const testRunner = TestRunner();

    testRunner.addTest({ test: test1 });
    testRunner.addTest({ test: test2 });

    test1.shouldBeCalledWith()
      .andThen(pass.shouldBeCalledWith())
      .andThen(test2.shouldBeCalledWith())
      .andThen(pass.shouldBeCalledWith())
      .when(() => {
        testRunner.runTests();
      });
  });

  it('should report a failed test', () => {
    const testRunner = TestRunner();
    testRunner.addTest({ test: test1, name: 'name' });

    test1.shouldBeCalledWith().andWillThrow('test failed for x reason')
      .andThen(failure.shouldBeCalledWith('name', 'test failed for x reason'))
      .when(() => {
        testRunner.runTests();
      });
  });

  // it('should handle async tests', async () => {
  //   console.log('async test')
  //   const testRunner = TestRunner();

  //   testRunner.addTest({ test: test1 });
  //   testRunner.addTest({ test: test2 });

  //   const p1 = {}
  //   p1.promise = new Promise((resolve) => {
  //     p1.resolve = resolve;
  //   });

  //   let runTestsPromise;

  //   test1.shouldBeCalledWith().andWillReturn(p1.promise)
  //     .when(() => {
  //       runTestsPromise = testRunner.runTests();
  //     });

  //   test2.shouldBeCalledWith()
  //     .when(() => {
  //       p1.resolve();
  //     });

  //   await runTestsPromise;
  // });
});
