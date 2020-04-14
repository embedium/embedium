#!/usr/bin/env node

'use strict';

const test = require('../src/test');

global['it'] = test.it;

require('./../spec/test_spec');

console.log('');
console.log('');
