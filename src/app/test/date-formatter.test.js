import chai from 'chai';
import formatter, { getCurrent } from 'app/utils/date-formatter.js'
import sinon from 'sinon';

const assert = chai.assert;

describe('Date Formatter Test', () => {
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
      const EPOCH = 'Thu Jan 01 1970';

      assert.equal(EPOCH, formatter(null));
      assert.equal(EPOCH, formatter(undefined));
      assert.equal(EPOCH, formatter(Infinity));
      assert.equal(EPOCH, formatter(NaN));
      assert.equal(EPOCH, formatter(''));
      assert.equal(EPOCH, formatter({}));
      assert.equal(EPOCH, formatter(() => {}));  
    });
});