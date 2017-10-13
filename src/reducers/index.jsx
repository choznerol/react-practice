import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import heros from './heros'
import profiles from './profiles'
import message from './message'

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    heros,
    profiles,
    message
});

export default rootReducer;
