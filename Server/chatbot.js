const tmi = require('tmi.js');
const robot = require('robotjs');
const fs = require('fs');
const d20 = require('./D20');
const commandSchema = require('./database/models/commandSchema.js');

    // function init(botUserName, oauthKey, channelName){
    debugger
    let botName;
    let key;
    let channel;

    // ***Set your bot's name.
    botName = "banditassistant"

    // ***Set to your bot's OAUTH key. Get it from here: https://twitchapps.com/tmi/ (Make sure you are logged in with the bot account.)
    key = "wkxcj1anf9q3dkcb5f6mgngpb0ww2g"

    // ***Channel you want your bot to run on.
    // channel = "headbanditkillian"
    channel = "HeadBanditKillian";
    // }
    
    // Define configuration options
    const credentials = {
        identity: {
            username: botName,
            password: key
        },
        channels: [
            channel
        ]
    }; 

    // Create a client with our options
   

    const client = new tmi.client(credentials);;
    client.on('message', onMessageHandler);
    client.on(('connected'), onConnectedHandler);

    connect();
    // }
    
    function connect(){
        // Connect to Twitch:
        client.connect().then((data) => {
            console.log(`Connection successful. Data: ${data}`)
            return `Connection successful!`

        }).catch((err) => {
            console.log(`Could not connect. Error: ${err}`);
            return `Could not connect. Error: ${err}`
        });
    }

    function onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
        console.log("Chatbot is running.")
        console.log("If you close this, the chatbot will stop running.");
    }
        
    //Channel: Channel name its chatting on
    //Context: Object containing 
    //Msg: message sent
    //Self boolean checking if message is sent by bot
    function onMessageHandler(channel, context, msg, self) {
        if (self) { return; }
        //On message, check if format is a command then
        // client.say(channel, 'Hello');
        //Query database for JSON object
        commandSchema.find({
            commandName:msg
        })
        .then(doc => {
            console.log("Chatbot Request:", doc);
            console.log("doc/msg", doc[0].commandName, msg);
            if(doc[0].commandName == msg){
                client.say(channel, doc[0].message);
            }    
        })
        .catch(err => {
            console.log("Error:", err);
        })
        // let response = this.queryDatabase()

        //Parse response & check if command matches
        //If match, check that (current time - last used time) > cooldown.
        //If True, get command type(message, sound effect...) then execute response.
        //Then input current time used into database command.
    }



