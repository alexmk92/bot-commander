import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactButton from './components/Button';
import Toolbar from './containers/Toolbar';

const Provider = require("react-redux").Provider;
const createStore = require("redux").createStore;
const applyMiddleware = require("redux").applyMiddleware;
const ReduxPromise = require('redux-promise');
const reducers = require("./reducers/index");
const helpers = require("./helpers");

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
                <h1>This is the discord bot </h1>
                <Toolbar />
            </div>
        )
    }
}

const main = document.querySelector("#main");
if(main) {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Main />
        </Provider>
    , main)

}