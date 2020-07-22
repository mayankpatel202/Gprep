

module.exports = (msg) => {
  let block = {
    "type": "modal",
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
        "type": "context",
        "block_id": "PrivateChannelMessage",
        "elements": [
          {
            "type": "mrkdwn",
            "text": msg
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "input",
        "block_id": "AllPrivateChannelSelect",
        "label": {
          "type": "plain_text",
          "text": "Select All Student Private Chats"
        },
        "element": {
          "action_id": "AllStudentPrivateChannel",
          "type": "radio_buttons",
          "options": [
            {
              "value": "ALL",
              "text": {
                "type": "plain_text",
                "text": "ALL"
              }
            },
            {
              "value": "Not_All",
              "text": {
                "type": "plain_text",
                "text": "IF NOT ALL"
              }
            }
          ]
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
            "text": "Select Private Channels"
          },
          "filter": {
            "include": ["private"],
            "exclude_bot_users": true,
          }
        }
      }
    ]
  }

  return block;
}


