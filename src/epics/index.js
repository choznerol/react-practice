import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchProfile, fetchProfileFulfilled,
            fetchProfileRejected, patchProfileFulfilled,
            patchProfileRejected, fetchHerosFulfilled } from '../actions'
import { hideLoading } from 'react-redux-loading-bar'

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



/**
 * 抓取 profile，成功後 dispatch 'HIDE_LOADING' 和 'FETCH_HEROS_FULFILLED'
 */
const fetchProfileEpic = action$ =>
    action$.ofType('FETCH_PROFILE')
    // Demo loading bar
    .delay(1000)
    .mergeMap(action =>
        ajax({
            url: `http://hahow-recruit.herokuapp.com/heroes/${action.id}/profile`,
            crossDomain: true,
            responseType: 'json'
        })
        .mergeMap((data) => {
            if (data.status === 200) {
                return Observable.concat(
                    Observable.of(fetchProfileFulfilled(data.response, action.id)),
                    Observable.of(hideLoading())
                )
            } else {
                return Observable.of(fetchProfileRejected(data.code))
            }
        })
        .takeUntil(action$.ofType('FETCH_PROFILE_CANCELED'))
        .catch(error => Observable.of(fetchProfileRejected(error.message)))
    )



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
