import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchHerosFulfilled, fetchProfileFulfilled,
        fetchProfileRejected, fetchProfile } from '../actions'


// 抓取所有 heros
const fetchHerosEpic = action$ =>
    action$.ofType('FETCH_HEROS')
    .switchMap(action =>
        ajax({
            url: 'http://hahow-recruit.herokuapp.com/heroes',
            crossDomain: true,
            responseType: 'json'
        })
        .map(data => fetchHerosFulfilled(data.response))
        .catch(error => Observable.of(fetchProfileRejected(error.message)))
    );


// 檢查 store 裡若沒有需要的 profile 就 fetch
const fetchProfileIfNeededEpic = (action$, store) =>
    action$.ofType('FETCH_PROFILE_IF_NEEDED')
    .filter(action => !store.getState().profiles.items[action.id])
    .map((action) => fetchProfile(action.id))


// 抓取一個 profile
const fetchProfileEpic = action$ =>
    action$.ofType('FETCH_PROFILE')
    .mergeMap(action =>
        ajax({
            url: `http://hahow-recruit.herokuapp.com/heroes/${action.id}/profile`,
            crossDomain: true,
            responseType: 'json'
        })
        // 有時會收到 200OK 的 {code: 1000, msg: 'Server Error'}
        .map(data => data.code ?
            fetchProfileRejected(data.code) :
            fetchProfileFulfilled(data.response, action.id))
        .catch(error => Observable.of(fetchProfileRejected(error.message)))
        .takeUntil(action$.ofType('FETCH_PROFILE_CANCELED'))
    );


const rootEpic = combineEpics(
    fetchProfileIfNeededEpic,
    fetchHerosEpic,
    fetchProfileEpic
);

export default rootEpic
