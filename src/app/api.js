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
    const then = new Date();

    then.setDate((new Date()).getDate() - 100);

    xhr.open('GET',
              `${URL}&starttime=${then.toISOString()}&latitude=${
                lat}&longitude=${lng}&maxradiuskm=${radius}`);

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

/**
 * Acquires earthquakes around the specified latitude and longitude within
 * a given radius.
 *
 * @param {number} lat Center latitude.
 * @param {number} lng Center longitude.
 * @param {number} radius Radius around the coordinates
 * @param {(!Date|string)} startDate Start Date.
 * @param {(!Date|string)=} endDate End Date. Defaults to the current date.
 *
 * @return {!Promise<!Object>}
 */
export default function getEvents(lat, lng, radius, startDate, endDate = new Date()) {
  const xhr = new XMLHttpRequest();
  const start = (new Date(startDate)).toISOString();
  const end = (new Date(endDate)).toISOString();

  return new Promise((resolve, reject) => {
    xhr.open('GET',
             `${URL}&starttime=${start}&endtime=${end
            }&latitude=${lat}&longitude=${lng}&maxradiuskm=${radius}`);

    xhr.onload = ({ target }) => {
      const { status, response } = target;

      if (status >= 200 && status < 400) {
        try {
          const parsed = JSON.parse(response);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
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
