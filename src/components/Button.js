import React, { Component } from 'react';

class ReactButton extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <li onClick={this.props.onClick.bind(this, this.props.params)}>{ this.props.label || "Unset" }</li>
        );
    };
}

module.exports = ReactButton;