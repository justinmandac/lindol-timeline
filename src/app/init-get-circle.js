/**
 * @fileoverview Exports methods used for rendering event (read:earthquake) markers.
*/
function initGetCircle(symbol, timeComparator) {
  return function getCircle(item) {
    const style = {
      icon: {
        path: symbol,
        fillColor: 'red',
        fillOpacity: 0.2,
        scale: (item.f.mag ** 2) / 2,
        strokeColor: 'white',
        strokeWeight: 0.5,
      },
    };

    if (typeof timeComparator === 'function') {
      style.visible = timeComparator(item.f.time);
    }

    return style;
  };
}

export const defaultComparator = filter => (time) => {
  const min = new Date();
  const now = new Date();
  min.setDate(now.getDate() - filter);
  return time > min.getTime() && time <= now.getTime();
};

export const dailyComparator = filter => (time) => {
  const now = new Date();
  const then = new Date(); // the current date less 'filter' days ago
  const eventDate = new Date(time);
  // go back in time
  then.setDate(now.getDate() - filter);

  const thenString = then.toString().split(' ').slice(0, 4).join(' ');
  const eventString = eventDate.toString().split(' ').slice(0, 4).join(' ');

  return thenString === eventString;
};

export default initGetCircle;
