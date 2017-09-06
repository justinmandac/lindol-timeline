const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
            'format=geojson&' +
            'orderby=time&' +
            'eventtype=earthquake';
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
export default function getEvents(lat, lng, radius, startDate, 
  endDate = new Date()) {
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
