
module.exports =  {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Private Channel List"
			},
			"accessory": {
				"action_id": "text1234",
				"type": "multi_static_select",
				"placeholder": {
				  "type": "plain_text",
				  "text": "Select Channels"
				},
				"options": [
				  {
					"text": {
					  "type": "plain_text",
					  "text": "*this is plain_text text*"
					},
					"value": "value-0"
				  },
				  {
					"text": {
					  "type": "plain_text",
					  "text": "*this is plain_text text*"
					},
					"value": "value-1"
				  },
				  {
					"text": {
					  "type": "plain_text",
					  "text": "*this is plain_text text*"
					},
					"value": "value-2"
				  }
				]
			  }
		}
	]
}
