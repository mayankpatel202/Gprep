const express = require('express');
const router = express.Router();
const token = require('../slackapi/slackAuth');
const query = require('../database/queries');

router.post('/cmd', async (req, res) => { 
  let { user_id, team_domain } = req.body;
  query.checkStaff(user_id, team_domain, (doesExist) => {
    if(doesExist) {
      res.send("POST Hey I am from node server which my master mayank created. lolzzz");
    } else {
      res.send(`Hi ${req.body.user_name}, Click the url to get permission to use this app. *Also note you should be an ADMIN in this workspace*: ${process.env.SLACK_BUTTON_URL}`);
    }
  });
  
});

router.get('/hrprep/slackcode', async (req, res) => {  
  if(req.query.code) {
    let authToken = await token.getToken(req.query.code);
    if(authToken.ok) {
      res.send("Successfully Installed");
    } else {
      res.send(authToken.error);
    }
  } 
});

module.exports = router;