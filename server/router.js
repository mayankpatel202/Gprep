const express = require('express');
const router = express.Router();
const token = require('../slack/slackApis');
const query = require('../database/queries');
const createBlocks = require('../slack/PrivateBlocks');
const openModals = require('../slack/modal');


router.post('/broadcastPrivateChannel', async (req, res) => {
  let { user_id, team_id, trigger_id } = req.body;
  let staffExist = await query.checkStaff(user_id, team_id);
  let token = await query.checkToken(user_id, team_id);
  if (staffExist && token) {
    let block = createBlocks();
    await openModals(block, trigger_id, token);
    res.status(200).send();
  } else {
    res.send(`Hi ${req.body.user_name}, Click the url to get permission to use this app. *Also note you should be an ADMIN in this workspace*: ${process.env.SLACK_BUTTON_URL}`);
  }

});

router.post('/payload', async (req, res) => {
  //console.log("Payload: ", JSON.parse(req.body.payload).view.state);
  let input = JSON.parse(req.body.payload).view.state.values.PrivateChannelMessageLabel;
  let list = JSON.parse(req.body.payload).view.state.values.PrivateChannelList;
  console.log(input);
  console.log(list)
  res.status(200).send();
});


//RECIEVING SLACK CODE FOR TOKEN GENERATION
router.get('/hrprep/slackcode', async (req, res) => {
  if (req.query.code) {
    let authToken = await token.getToken(req.query.code);
    if (authToken.ok) {
      res.send("Successfully Installed");
    } else {
      res.send(authToken.error);
    }
  }
});

module.exports = router;