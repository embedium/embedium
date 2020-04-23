#!/usr/bin/env node

'use strict';

const testRunner = require('../src/TestRunner')();
const test = require('../src/Test')(testRunner);

global['it'] = test.it;
global['describe'] = test.describe;

require('./../spec/test_spec');
require('./../spec/TestRunner_spec');

testRunner.runTests();

console.log('');
console.log('');
