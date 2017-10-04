import {combineReducers} from 'redux';
import heros from './heros'
import selectedHeroId from './selectedHeroId'
import profiles from './profiles'

const rootReducer = combineReducers({
    // sample,
    heros,
    selectedHeroId,
    profiles
});

export default rootReducer;
