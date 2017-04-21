import chai from 'chai';
import formatter, 
      { formatDate, getDaysAgo, getDiff } from 'app/utils/date-formatter.js'
import sinon from 'sinon';

const assert = chai.assert;
const EPOCH = 'Thu Jan 01 1970';

describe('Date Formatter Test', () => {
  describe('test formatDate', () => {
    it('should be defined', () => {
      assert.isOk(formatDate, 'formatDate is not OK');
    });

    it('should return the correct date format', () => {
      var date1Str = 'Thu Apr 06 2017';
      var date2Str = 'Mon Mar 20 2017';
      var tz = ' GMT+0800'
      

      assert.equal(date1Str, formatDate(new Date(date1Str+tz)));
      assert.equal(date2Str, formatDate(new Date(date2Str+tz)));
      assert.equal(EPOCH, formatDate(null));
      assert.equal(EPOCH, formatDate(undefined));
      assert.equal(EPOCH, formatDate({}));
      assert.equal(EPOCH, formatDate(''));
    });
  });

  describe('test getDiff', () => {
    it('should be defined', () => {
        assert.isOk(getDiff);
    });

    it('should get the difference between 2 dates', () => {      
      const d1 = new Date('2017-04-23');
      const d2 = new Date('2017-04-22');

      assert.equal(1, getDiff(d1, d2));
    });
  });

  describe('test getDaysAgo', () => {
    let clock;

    beforeEach(() => {
      /**
       * Freeze time to 2017-04-21T00:29:34.568Z
      */
      const current = new Date('2017-04-21T00:29:34.568Z');
      clock = sinon.useFakeTimers(current.getTime());
    });

    afterEach(() => {
      clock.restore();
    });

    // Tests below
    it('should be defined', () => {
      assert.isOk(formatter, 'Formatter is not OK');
    });

    it('should display the date from X days ago', () => {      
      const today = formatter(0);
      const yesterday = formatter(1);
      // valid but weird input
      const tomorrow = formatter(-1);

      assert.equal('Fri Apr 21 2017', today);
      assert.equal('Thu Apr 20 2017', yesterday);
      assert.equal('Sat Apr 22 2017', tomorrow);
    });

    it('should return the epoch date when param is invalid',
    () => {


      assert.equal(EPOCH, formatter(null));
      assert.equal(EPOCH, formatter(undefined));
      assert.equal(EPOCH, formatter(Infinity));
      assert.equal(EPOCH, formatter(NaN));
      assert.equal(EPOCH, formatter(''));
      assert.equal(EPOCH, formatter({}));
      assert.equal(EPOCH, formatter(() => {}));  
    });      
  });
});