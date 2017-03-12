const t = require('./types');
const config = require('../config');
const helpers = require('../helpers');
const SessionManager = require('../classes/sessionManager');

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
        // URL should be: wss://gateway.discord.gg
        var sm = new SessionManager();
        sm.Connect(function(err, data) {
            console.log("Got err: ", err);
            console.log("Got data: ", data);
        });

        // Do this eventually
        return {
            type: t.CONNECT_TO_GATEWAY,
            payload: {
                connection: null,
                connected: false
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