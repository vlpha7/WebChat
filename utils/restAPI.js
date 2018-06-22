const rp = require('request-promise');

export const postToServer = (url, data) => {
  const options = {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  };
  return rp(options);
};
