const React = require('react');
const FontAwesome = require("react-fontawesome");

class Airhorn extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            commandPrefix: "!",
            items: [
                { label : "JC", icon : "male", command: { type : "post", message : "johncena" } },
                { label : "AH", icon : "bullhorn", command: { type : "post", message : "airhorn" } }
            ]
        }
    }

    renderBotCommandItems()
    {
        return this.state.items.map(function(item) {
            return (
                <li onClick={this.props.onRequest.bind(this, item.command)} key={item.label + "_airhorn"}>
                    <FontAwesome name={item.icon} /> { item.label }
                </li>
            )
        }.bind(this));
    }

    render()
    {
        return (
            <ul>
                { this.renderBotCommandItems() }
            </ul>
        )
    }
}

module.exports = Airhorn;