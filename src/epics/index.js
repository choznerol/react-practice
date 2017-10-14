import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax';
import { hideLoading } from 'react-redux-loading-bar'
import { fetchHerosFulfilled,
         fetchHerosRefected,
         fetchProfile,
         fetchProfileFulfilled,
         fetchProfileRejected,
         patchProfileFulfilled,
         patchProfileRejected,
         hideSubmitLoading } from '../actions'

/**
 * 抓取所有英雄資料，成功後 dispatch 'HIDE_LOADING' 和 'FETCH_HEROS_FULFILLED'
 */
const fetchHerosEpic = action$ =>
    action$.ofType('FETCH_HEROS')
    // Demo loading bar
    .delay(1000)
    .switchMap(action =>
        ajax({
            url: 'http://hahow-recruit.herokuapp.com/heroes',
            crossDomain: true,
            responseType: 'json'
        })
        .mergeMap((data) => {
            if (data.status === 200) {
                return Observable.concat(
                    Observable.of(fetchHerosFulfilled(data.response)),
                    Observable.of(hideLoading())
                )
            } else {
                return Observable.concat(
                    Observable.of(fetchHerosRefected(data.code)),
                    Observable.of(hideLoading())
                )
            }
        })
        .catch(error => Observable.of(fetchHerosRefected(error.message), hideLoading()))
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


/**
 * 更新一位英雄的資料，成功後 dispatch 'HIDE_SUBMIT_LOADING' 和 'PATCH_PROFILE_FULFILLED'
 */
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
        .mergeMap((data) => {
            if (data.status === 200) {
                return Observable.concat(
                    Observable.of(patchProfileFulfilled(data, action.id)),
                    Observable.of(hideSubmitLoading())
                )
            } else {
                return Observable.concat(
                    Observable.of(patchProfileRejected(data.code)),
                    Observable.of(hideSubmitLoading())
                )
            }
        })
        .catch(error => Observable.of(patchProfileRejected(error)))
    );


const rootEpic = combineEpics(
    fetchHerosEpic,
    fetchProfileIfNeededEpic,
    fetchProfileEpic,
    patchProfileEpic
);

export default rootEpic
