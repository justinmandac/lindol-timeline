const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
            'format=geojson&' +
            'orderby=time&' +
            'eventtype=earthquake&' +
            'latitude=14.5995&' +
            'longitude=120.9842&' +
            'maxradiuskm=1000';

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

