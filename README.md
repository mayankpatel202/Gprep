# Hack Reactor Premium Prep Utilities
This app automates processes for HR Prep Staff

## Prerequisites
 1. Node
 2. MySQL Server


## Installing
A step by step series of examples that tell you how to get a development env running
 1. Clone the repo to your local machine.
 2. Via terminal get into the folder of the project and type `npm install`

## Start App
### From the main folder of the project in the Terminal
 1. Type `./ngrok http 3000`. 
   *This will start up a server to connect your computer to the outside world*
 2. Open new terminal and type `npm run start`.
 3. Start MYSQL server on your computer and add a **hrprep** database

## Setup Slack App
 1. In the Slack api website click on **Your Apps**
 2. Click **Create New App**
 3. Give you app a name and select the Development workspace for the app and click *Create App*.
 4. On the resulting screen click on *Slash Commands* and then click *Create New Command*.
 5. In **Command** type `broadcast_private_channel`.
 6. In **Request URL** copy and paste the *https* link in the running .ngrok server followed by `/broadcastPrivateChannel` and click save in the bottom.
 7. On the left side menu options click on **OAuth & Permissions**.
 8. In the *Redirect URLS* copy paste the same *https* link in .ngrok followed by `/hrprep/slackcode` and save URL
 9. Scroll down on the same page to Scopes and go to **User Token Scopes**
 10. Click *Add an oAuth Scope*.
 11. Add the following Scopes
     * chat:write
     * groups:read
     * user:read
     * users:read:email
12. Now on the left menu. Select **Interactivity & Shortcuts**
13. Toggle the button to ON
14. Copy and paste the *https* ,ngrok link in the *Request URL* input box followed by `/payload` and click save changes
15. On the left menu now click **Manage Distribution**.
16. Select *Remove Hard Coded Information* and click the only checkbox.
    * *You should see a green tick on all options*.
17. Click on *Activate Public Distribution*.
18. On the resulting page of Manage Distribution you should see a *Add To Slack* button, click it.
19. Add the app to a workspace, avoid testing the app on an active workspace.

## Create a .env file in main project folder.
   - SLACK_CLIENT_ID= *In **Basic Information** in your slack app*
   - SLACK_CLIENT_SECRET=*In **Basic Information** in your slack app*
   - MYSQL_USER= *your database user name (usually root)*
   - MYSQL_HOST=localhost
   - MYSQL_DATABASE=hrprep
   - MYSQL_PASSWORD= *If Required for your user*
   - SLACK_BUTTON_URL=*In **Manage Distribution** in your slack app*

### Go to the workspace where you installed the app and type the slash command along with the message you want to send and follow the steps.


## Authors
**Mayank Patel - Senior Teaching Assistant - Hack Reactor Premium Prep**

## License
This project is licensed under the MIT License - see the LICENSE.md file for details



