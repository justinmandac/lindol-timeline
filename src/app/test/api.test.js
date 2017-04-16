var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var fs = require('fs');

var testData = JSON.parse(fs.readFileSync('./src/app/test/data/test0.json', 'utf-8'));
var api = require('app/api.js');

console.log(api);
// console.log(testData.features);


function toReadableDate(date) {
    return date.toISOString().split('T').shift();
}

describe('Initial test', function() {
    describe('mocha webpack must run', function() {
       it('should just pass', function() {
             assert(true, 'yey');
       });

       it('should be able to display', function() {
            var startDate = new Date('2017-04-10');
       });
    });
});