

module.exports  = () => {
  let block = {
    "type": "modal",
    "callback_id": "Private_Channels_Modal",
    "title": {
      "type": "plain_text",
      "text": "Select Private Channels",
    },
    "submit": {
      "type": "plain_text",
      "text": "SUBMIT"
    },
    "blocks": [
      {
        "type": "input",
        "block_id": "PrivateChannelMessageLabel",
        "label": {
          "type": "plain_text",
          "text": "Type your Message"
        },
        "element": {
          "type": "plain_text_input",
          "action_id": "PrivateChannelMessage",
          "placeholder": {
            "type": "plain_text",
            "text": "Enter your Message"
          }
        }
      },
      {
        "type": "input",
        "block_id": "PrivateChannelList",
        "label": {
          "type": "plain_text",
          "text": "Select from List"
        },
        "element": {
          "action_id": "PrivateChatChannelList",
          "type": "multi_conversations_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select Chats"
          },
          "filter": {
            "include": ["private"],
            "exclude_bot_users": true
          }
        }
      },
    ]
  }

  return block;
}
