const config = require('../config');

// Ideally we want to abstract this out to a separate
// server bot as we need to send heartbeat messages here,
// seems a little over complicated for a simple client
// app, this will actually run more like a server

const SessionManager = function(callback) {
    this.connectionURL = config.DISCORD_WSS_API_BASE_URL + "?v=5&encoding=json";
    this.ws = null;
    this.Connect(function(err, data) { callback(err, data) });
};

SessionManager.prototype.Connect = function(callback) {
    try {

        this.ws = new WebSocket(this.connectionURL);

        this.ws.onerror = function(err) {
            callback(err, null);
        };

        this.ws.onclose = function() {
            // reconnect here, can happen a lot
        };

        //this.ws

    } catch(exception) {
        callback("Failed to initialise web socket", null);
    }
};

module.exports = SessionManager;