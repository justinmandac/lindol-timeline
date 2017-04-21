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
  return then.toString()
        .split(' ') // remove the time and timezone
        .slice(0, 4).join(' ');
};


export default getDaysAgo;