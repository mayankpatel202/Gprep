const slackApi = require('../slackApis');
const query = require('../../database/queries');

const createMessage = async (payload, staffId, teamId, blocks) => {

  let message = '';
  blocks.forEach((block) => {
    if(block.block_id === 'PrivateChannelMessage') {
      message = block.elements[0].text;
    }
  });
  
  if(payload.AllPrivateChannelSelect.AllStudentPrivateChannel.selected_option.value === "ALL") {
    let listOfPvtChannels = await getAllStudentPrivateChannelIds(staffId, teamId);
  } else {
    let listOfPvtChannels = payload.PrivateChannelList.PrivateChatChannelList.selected_conversations;
  }
  
  let privateChannelData = await getPvtChannelMembers(listOfPvtChannels, staffId, teamId);
  await sendMessage(privateChannelData, message, staffId, teamId)
  
}

const getPvtChannelMembers = async (pvtChannels, staffId, teamId) => {
  
  let userLists = await slackApi.getUserList(null, teamId, staffId);
  return Promise.all(pvtChannels.map(async (channel) => {
    let members = await slackApi.getPrivateChannelMembers(channel, staffId, teamId);
    let studentId = await getPrivateChannelStudentId(members, teamId, staffId, userLists);
    return { channelId: channel, studentId };
  }));

}

const getPrivateChannelStudentId = async (members, teamId, staffId, userLists) => {
  for(var i = 0; i < userLists.members.length; i++) {
    let user = userLists.members[i];
    if(members.members.includes(user.id) && !(user.profile.email.includes('@galvanize.com'))) {
      return user.id;
    }
  }
   
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