const t = require('./types');
const config = require('../config');
const helpers = require('../helpers');

module.exports = {
    sendRequestViaWebhook: function(parameters) {
        console.log("Reuqest received: ", parameters)

        /*
        // post to: /webhooks/{webhook.id}/webhook.token}
        helpers.ajax({
            type: parameters.type,
            url: config.DISCORD_BOT_API_BASE_URL + "/webhooks/" + config.WEBHOOK_ID + "/" + config.WEBHOOK_TOKEN,
            contentType: "application/json",
            cache: true,
            data: {
                content: parameters.message,
                username: parameters.username || "Bot Controller"
            }
        });
        */

        // Post to /channels/{channel.id}/messages
        helpers.ajax({
            type: parameters.type,
            url: config.DISCORD_BOT_API_BASE_URL + "/channels/" + config.CHANNEL_ID + "/messages",
            contentType: "application/json",
            cache: true,
            data: JSON.stringify({
                content: parameters.message
            })
        });

        return {
            type: t.SEND_REQUEST,
            payload: {}
        }
    },
    connectToGateway: function() {
        console.log("Connecting")
        // TODO: Do a cache from hitting the endpoint only recache if we cant connect
        // Get the WSS connection URL and then cache it
        // URL shoul dbe: wss://gateway.discord.gg  
        helpers.ajax({
            type: "GET",
            url: config.DISCORD_BOT_API_BASE_URL + "/gateway"
        }).then(function(data) {

        }, function() {
            
        });

        return {
            type: t.CONNECT_TO_GATEWAY,
            payload: {
                connection : "yo jonas",
                connected : true
            }
        }
    },
    disconnectFromGateway: function() {
        console.log("Disconnecting")

        return {
            type: t.DISCONNECT_FROM_GATEWAY,
            payload: {}
        }
    }
};