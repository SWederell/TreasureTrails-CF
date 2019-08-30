const calculateDistance = (lat1, lon1, lat2, lon2, unit = 'km') => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2)
      + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'km') {
    dist *= 1.609344;
  }
  dist = Number(`${Math.round(`${dist}e1`)}e-1`);
  dist = dist.toString();
  return dist;
};

const dynamicSort = property => (a, b) => {
  if (property === 'distance') {
    return a.distance - b.distance;
  }
  return a[property].localeCompare(b[property]);
};

const JSONtoArray = (jsonObject) => { // move to reducer
  const arr = [];
  Object.keys(jsonObject).forEach((key) => {
    let v = jsonObject[key];
    v = { ...v, key };
    arr.push(v);
  });
  return arr;
};

export {
  calculateDistance,
  dynamicSort,
  JSONtoArray
};
