const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
            'format=geojson&' +
            'orderby=time&' +
            'eventtype=earthquake';
/**
 * @function transformDate
 * @param {number} longDate
 * @return {Date}
 */
export function transformDate(longDate) {
  return new Date(longDate);
}

/**
 * @function loadData
 *
 * Loads data from the USGS.
 *
 * @param {number} lat
 * @param {number} lng
 * @param {number} radius
 *
 * @return {Promise}
*/
function loadData(lat, lng, radius) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET',
              `${URL}&latitude=${lat}&longitude=${lng}&maxradiuskm=${radius}`);

    xhr.onload = ({ target }) => {
      const { status, response } = target;

      if (status >= 200 && status < 400) {
        const responseParsed = JSON.parse(response);
        resolve(responseParsed);
      } else {
        reject(target);
      }
    };

    xhr.onerror = ({ target }) => {
      reject(target);
    };

    xhr.send();
  });
}


export default loadData;
