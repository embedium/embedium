#!/usr/bin/env node

'use strict';

const test = require('../src/test');

global['it'] = test.it;
global['describe'] = test.describe;

require('./../spec/test_spec');

console.log('');
console.log('');
