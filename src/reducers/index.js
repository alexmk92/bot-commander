const Redux = require('redux');

const CommandReducer = require('./reducer.commands');

// All application state is stored in the Root Reducer
const RootReducer = Redux.combineReducers({
   commandReducer : CommandReducer
});

module.exports = RootReducer;