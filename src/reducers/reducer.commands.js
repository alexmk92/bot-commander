const t = require('../actions/types');
const update = require('react-addons-update');

module.exports = function(state, action) {
    if(typeof state !== "undefined") {
        switch(action.type)
        {
            
            case t.SEND_REQUEST:
                console.log("Got a play command");
                break;
            case t.CONNECT_TO_GATEWAY:
                return {
                    discordGatewayConnection: action.payload.connection,
                    initializedGateway: action.payload.connected
                };
                break;
            default:
                return state;
        }
    }

    console.log("Sending default state back");
    return {
        discordGatewayConnection: null,
        initializedGateway: false
    }
};