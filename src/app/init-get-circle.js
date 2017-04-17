

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

    if(typeof timeComparator === 'function') {
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

export default initGetCircle;