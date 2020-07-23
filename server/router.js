const express = require('express');
const router = express.Router();
const slackApi = require('../slack/slackApis');
const query = require('../database/queries');
const createBlocks = require('../slack/PrivateChannels/PrivateBlocks');
const openModals = require('../slack/modal');
const rPayload = require('../slack/payloadRouter');

// SLASH COMMAND FOR BLASTING MESSAGES TO MULTIPLE OR ALL PRIVATE CHAT CHANNELS
router.post('/broadcastPrivateChannel', async (req, res) => {

  if(req.body.text === "") {
    res.send("*Please Type a Message to send*. :smile:")
  }

  let { user_id, team_id, trigger_id } = req.body;
  let staffExist = await query.checkStaff(user_id, team_id);
  let token = await query.checkToken(user_id, team_id);

  if (staffExist && token) {
    let block = createBlocks(req.body.text);
    await openModals(block, trigger_id, token);
    res.status(200).send();
  } else {
    res.send(`Hi ${req.body.user_name}, Click the url to get permission to use this app. *Also note you should be an ADMIN in this workspace*: ${process.env.SLACK_BUTTON_URL}`);
  }

});

//RECIEVING PAYLOAD FROM SUBMISSION AND ROUTED ACCORDINGLY
router.post('/payload', async (req, res) => {

  let payload = JSON.parse(req.body.payload);
  rPayload.routePayload(payload.view.state.values, payload.user, payload.team, payload.view.blocks)
  res.status(200).send();

});


//RECIEVING SLACK CODE FOR TOKEN GENERATION
router.get('/hrprep/slackcode', async (req, res) => {

  if (req.query.code) {

    let authToken = await slackApi.getToken(req.query.code);

    if (authToken.ok) {
      res.send("Successfully Installed");
    } else {
      res.send(authToken.error);
    }

  }

});

module.exports = router;