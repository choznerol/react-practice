import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchProfile, fetchProfileFulfilled,
            fetchProfileRejected, patchProfileFulfilled,
            patchProfileRejected, fetchHerosFulfilled } from '../actions'


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
        // 曾經收到 200OK 的 {code: 1000, msg: 'Server Error'} 回應
        .map(data => data.code === 1000 ?
            fetchProfileRejected(data.code) :
            fetchProfileFulfilled(data.response, action.id))
        .catch(error => Observable.of(fetchProfileRejected(error.message)))
        .takeUntil(action$.ofType('FETCH_PROFILE_CANCELED'))
    );


const patchProfileEpic = (action$, store) =>
    action$.ofType('PATCH_PROFILE')
    .switchMap(action =>
        ajax({
            url: `https://hahow-recruit.herokuapp.com/heroes/${action.id}/profile`,
            method: 'PATCH',
            body: action.data,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .map(data => patchProfileFulfilled(data, action.id))
        .catch(error => Observable.of(patchProfileRejected(error)))
    );


const rootEpic = combineEpics(
    fetchHerosEpic,
    fetchProfileIfNeededEpic,
    fetchProfileEpic,
    patchProfileEpic
);

export default rootEpic
