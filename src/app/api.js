const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
            'format=geojson&' +
            'orderby=time&' +
            'eventtype=earthquake';


export default function loadData(lat, lng, radius) {
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

