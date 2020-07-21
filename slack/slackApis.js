const api = require('./apis');
const query = require('../database/queries');
const filterStaff = require('./filterStaff');

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
      let userInfo = await userProfile(response.authed_user.id, response.authed_user.access_token)
      let checkAdmin = userInfo.ok;
      if(checkAdmin) {
        
        await query.createTable(response.team.id);
        await query.insertTeamProfile({ team: response.team, teamToken: response.access_token });

        let checkIfStaffExists = await query.checkStaff(userInfo.user.id, response.team.id);
        console.log("Check if Staff Exists In SlackAPIs: ", checkIfStaffExists );
        if(checkIfStaffExists) {
          await query.insertUserToken({ userId: userInfo.user.id, token: response.authed_user.access_token }, response.team.id);
        } else {
          let userProfile = {
            userId: userInfo.user.id,
            userName: userInfo.user.profile.real_name,
            userToken: response.authed_user.access_token,
            userEmail: userInfo.user.profile.email
          };
          await query.insertUserProfile(userProfile, response.team.id);

          let slackUsers = await getUserList(response.authed_user.access_token);
          await query.insertStaffProfile(filterStaff(slackUsers.members), response.team.id);
        }
        
        return response;
      } else {
        api.get('https://slack.com/api/auth.revoke', { params: { token: response.authed_user.access_token } })
        return userInfo;
      }
    
    })
    .catch((err) => console.log(err));

}



const userProfile = (id, access_token) => {
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

const getUserList = (token) => {
  let url = 'https://slack.com/api/users.list';
  let params = { token }
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
  

module.exports = { getToken, getUserList }