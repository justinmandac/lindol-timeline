/**
 * @function formatDate
 * @param {Date} date
 * @return {string}
*/
export function formatDate(date) {
  let val;

  if (date instanceof Date) {
    val = date;
  } else {
    // return the epoch time if date is invalid
    val = new Date(null);
  }
  // Date.prototype.toString returns the ff.
  // ex. Thu Apr 6 2017 14:46:43 GMT+0800 (+08 d)
  return val.toString().split(' ')
        .slice(0, 4) // remove the time and timezone
        .join(' ');
}

/**
 * @function getDateAgo
 * @param {number} value - days to move past the current date
 * @return {Date}
*/
export function getDateAgo(value) {
  const then = new Date();
  const days = parseFloat(value);
  const now = new Date();

  if (isNaN(days)) {
    return new Date(null);
  }

  then.setDate(now.getDate() - days);

  return then;
}

/**
 * @function getDiff
 * Computes for the absolute difference between 2 dates.
 * Only the absolute difference is necessary since for this application,
 * we are only dealing with past events.
 * @param {Date} a
 * @param {Date} b
 *
 * @return {number}
*/
export function getDiff(a, b) {
  const timeDiff = Math.abs(a.getTime() - b.getTime());

  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * @function getDaysAgo
 * Returns the human readable date from `days` ago.  Returns
 * Thu Jan 01 1970 if `days` is undefined, null, or not a number.
 * @param {number} days - number of days to go back to.
 * @return {string}
 *
 * @example
 * Assume that today is 2017-04-20
 * getDaysAgo(0); // Fri Apr 20 2017
 * getDaysAgo(1); // Thu Apr 19 2017
 * getD
*/
const getDaysAgo = (days) => {
  let then = new Date();
  const now = new Date();
  const diff = now.getDate() - days;

  if (typeof days !== 'number' ||
     days === Infinity ||
     isNaN(days)) {
    then = new Date(null);
  } else {
    then.setDate(diff);
  }
  return formatDate(then);
};


export default getDaysAgo;
