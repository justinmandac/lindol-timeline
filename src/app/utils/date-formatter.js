/**
 * @function formatDate
 * @param {Date} date
 * @return {string}
*/
export function formatDate(date) {
  let val;

  if(date instanceof Date) {
    val = date;
  } else {
    val = new Date(null);
  }

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
  let then = new Date();
  const days = parseFloat(value);
  const now = new Date();
  let diff;

  if(isNaN(days)) {
    return new Date(null);
  }
  
  then.setDate(now.getDate() - days);
  
  return then;
}

/**
 * @function getDiff
 * @param {Date} a
 * @param {Date} b
 * 
 * @return {number}
*/
export function getDiff(a, b) {
  return a.getDate() - b.getDate();
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

  if(typeof days !== 'number' ||
     days === Infinity ||
     isNaN(days)) {
      then = new Date(null);
  } else {
    then.setDate(diff);
  }    
  return formatDate(then);
};


export default getDaysAgo;