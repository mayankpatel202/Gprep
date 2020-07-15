const api = require('./slackapis');

const getToken = (slackCode) => {
  let url = 'https://slack.com/api/oauth.v2.access';
  let body = {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: slackCode
  }
  let config = {
    params: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return api.post(url, null, config)
    .then(async (response) => {
      let checkAdmin = await isAdmin(response.authed_user)
      if(checkAdmin) {
        return response;
      } else {
        api.get('https://slack.com/api/auth.revoke', { params: { token: response.data.authed_user.access_token } })
        return { ok: false, error: "Not An Admin"};
      }
    
    })
    .catch((err) => console.log(err));

}



const isAdmin = ({ id, access_token }) => {
  let url = 'https://slack.com/api/users.info';
  let params = { user: id, token: access_token }
  let config = {
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return api.get(url, config)
    .then( response =>  response.user.is_admin )
    .catch(err => console.log(err));
  
}
  

module.exports = { getToken, isAdmin }