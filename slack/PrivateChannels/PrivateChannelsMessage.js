const slackApi = require('../slackApis');
const query = require('../../database/queries');

const createMessage = async (payload, staffId, teamId, blocks) => {

  let message = '';
  blocks.forEach((block) => {
    if(block.block_id === 'PrivateChannelMessage') {
      message = block.elements[0].text;
    }
  });
  let listOfPvtChannels;
  if(payload.AllPrivateChannelSelect.AllStudentPrivateChannel.selected_option.value === "ALL") {
    listOfPvtChannels = await getAllStudentPrivateChannelIds(staffId, teamId);
  } else {
    listOfPvtChannels = payload.PrivateChannelList.PrivateChatChannelList.selected_conversations;
  }

  let userLists = await slackApi.getUserList(null, teamId, staffId);
  let privateChannelMembers = await getPvtChannelMembers(listOfPvtChannels, staffId, teamId);
  let privateChannelData = processMessageBody(privateChannelMembers, userLists);
  let resultOfSending = await sendMessage(privateChannelData, message, staffId, teamId)
  console.log(resultOfSending);
}

const getPvtChannelMembers = (pvtChannels, staffId, teamId) => {
  
  return Promise.all(pvtChannels.map(async (channel) => {
    let privateChannelMembers = await slackApi.getPrivateChannelMembers(channel, staffId, teamId);
    return [channel, privateChannelMembers];
  }));

}

const processMessageBody = (members, userLists) => {
  let channelAndStudentIds = [];
  for(var user of userLists.members) {
    for(var pvtChannelMembers of members) {
      if(pvtChannelMembers[1].members.includes(user.id) && user.profile.email &&!(user.profile.email.includes("galvanize.com"))) {
        channelAndStudentIds.push({ channelId: pvtChannelMembers[0], studentId: user.id })
      }
    }
  }
  
  return channelAndStudentIds;
}

const sendMessage = (privateChannelData, message, staffId, teamId) => {

  return Promise.all(privateChannelData.map(async (channel) => {
    let msg = `<@${channel.studentId}> ${message}`; 
    let response = await slackApi.sendMessageToStudentChats(channel, msg, staffId, teamId);
    return response.ok;
  }));
  
}

const getAllStudentPrivateChannelIds = async (staffId, teamId) => {
  let pvtChannels = await slackApi.getPrivateChannels(staffId, teamId);
  let studentChannels = [];
  pvtChannels.channels.forEach(channel => {
    if(channel.name.includes("chat")) {
      studentChannels.push(channel.id);
    }
  });
  return studentChannels;
}


module.exports = { createMessage };