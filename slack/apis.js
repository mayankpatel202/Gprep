const axios = require('axios');

const post = (url, body=null, config={}) => {
    return axios.post(url, body, config)
      .then((response) => response.data)
      .catch(err => err);
}

const get = (url, config={}) => {
    return axios.get(url, config)
      .then(response => response.data)
      .catch(err => err)
}

module.exports = { post, get };
