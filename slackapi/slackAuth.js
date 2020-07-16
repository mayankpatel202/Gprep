const api = require('./slackapis');
const query = require('../database/queries');

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
      let userInfo = await isAdmin(response.authed_user.id, response.access_token)
      let checkAdmin = userInfo.ok;
      if(checkAdmin) {
        let data = {
          team: response.team,
          teamToken: response.access_token,
          userId: userInfo.user.id,
          userName: userInfo.user.profile.real_name,
          userEmail: userInfo.user.profile.email,
          userToken: response.authed_user.access_token
        }
        await query.createTable(data);
        return response;
      } else {
        api.get('https://slack.com/api/auth.revoke', { params: { token: response.authed_user.access_token } })
        return userInfo;
      }
    
    })
    .catch((err) => console.log(err));

}



const isAdmin = (id, access_token) => {
  let url = 'https://slack.com/api/users.info';
  let params = { user: id, token: access_token }
  let config = {
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return api.get(url, config)
    .then( response =>  { return response } )
    .catch(err => console.log(err));
  
}
  

module.exports = { getToken, isAdmin }