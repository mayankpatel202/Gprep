const api = require('./apis');

module.exports = async (view, trigger_id, token) => {
  let url = 'https://slack.com/api/views.open';
  let body = {
    trigger_id,
    view,
  }
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  return api.post(url, body, config)
         .then((response) => console.log("Modal Open: ", response.view.state))
}