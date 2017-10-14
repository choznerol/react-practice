import { combineEpics } from 'redux-observable'

import patchProfileEpic from './patchProfile'
import fetchHerosEpic from './fetchHeros'
import { fetchProfileIfNeededEpic, fetchProfileEpic } from './fetchProfile'


const rootEpic = combineEpics(
    fetchHerosEpic,
    fetchProfileIfNeededEpic,
    fetchProfileEpic,
    patchProfileEpic
);

export default rootEpic
