const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
            'format=geojson&' +
            'orderby=time&' +
            'eventtype=earthquake&' +
            'latitude=12.8797&' + // PH latitude
            'longitude=121.7740&' + // PH longitude
            // 700 km radius from coords. Used the sqrt of PH area as radius
            // plus a ~200km fudge factor
            'maxradiuskm=700';

export default function loadData() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', URL);

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

