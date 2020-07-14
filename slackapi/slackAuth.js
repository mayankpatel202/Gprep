const axios = require('axios');
const qs = require('qs');

const getToken = (slackCode) => {
  let url = 'https://slack.com/api/oauth.v2.access';
  let body = {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: slackCode
  }
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return axios.post(url, qs.stringify(body), config)
    .then((response) => response.data );

}

const getAuthCode = (scopes) => {
  let url = 'https://slack.com/oauth/v2/authorize';
  
}

module.exports = { getToken, getAuthCode }