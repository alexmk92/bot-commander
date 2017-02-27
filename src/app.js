import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // set any state here
        }
    }

    render() {
        return (
            <div>
                <h1>This is the discord bot manager</h1>
            </div>
        )
    }
}

const main = document.querySelector("#main")
if(main) {
    ReactDOM.render(<Main />, main)
}