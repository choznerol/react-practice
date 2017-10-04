import {combineReducers} from 'redux';
import heros from './heros'
import profiles from './profiles'
import message from './message'

const rootReducer = combineReducers({
    heros,
    profiles,
    message
});

export default rootReducer;
