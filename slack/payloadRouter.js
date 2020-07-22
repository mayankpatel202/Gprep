const processMessage = require('./PrivateChannels/PrivateChannelsMessage');


const routePayload = async (submissionPayload, user, team, blocks) => {
  let payload = Object.keys(submissionPayload)[0];
  //console.log(submissionPayload.AllPrivateChannelSelect.AllStudentPrivateChannel.selected_option.value);
  switch (payload) {
    case 'AllPrivateChannelSelect':
      await processMessage.createMessage(submissionPayload, user.id, team.id, blocks);
      break;
  }
}


module.exports = { routePayload };