import {combineReducers} from 'redux';
import heros from './heros'
import profiles from './profiles'

const rootReducer = combineReducers({
    heros,
    profiles
});

export default rootReducer;
