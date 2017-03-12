import React, { Component } from 'react';
const Redux = require('redux');
const ReactRedux = require('react-redux');
const Actions = require('../actions/commands');
const Airhorn = require("../components/bot-adaptors/Airhorn");

class Toolbar extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            discordGatewayConnection: null,
            initializedGateway: false
        }
    };

    componentWillMount()
    {
        if(!this.state.initializedGateway) {
            this.props.connectToGateway();
        }
    }

    componentDidUpdate()
    {
        console.log("New state is: ", this.state)
    }

    render()
    {
        return (
            <div>
                <Airhorn onRequest={this.props.sendRequest} />
            </div>
        );
    }
}

// If we eventually want to track any state then we will set the required parameters here
function mapStateToProps(state) {
    return {
        discordGatewayConnection : state.commandReducer.discordGatewayConnection,
        initializedGateway: state.commandReducer.initializedGateway
    }
}

function mapDispatchToProps(dispatch) {
    return Redux.bindActionCreators({
        sendRequest : Actions.sendRequestViaWebhook,
        connectToGateway : Actions.connectToGateway
    }, dispatch)
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Toolbar);