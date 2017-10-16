import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { fetchProfile,
         fetchProfileFulfilled,
         fetchProfileRejected } from '../actions'


/**
 * 檢查要求的 profile 是否已存在 store 中，若沒有則以 fetchProfile 抓取
 */
export const fetchProfileIfNeededEpic = (action$, store) =>
    action$.ofType('FETCH_PROFILE_IF_NEEDED')
    .filter(action => !store.getState().profiles.items[action.id])
    .map((action) => fetchProfile(action.id))


/**
 * 抓取一個英雄的能力值，成功後 dispatch 'HIDE_PROFILE_LOADING' 和 'FETCH_PROFILE_FULFILLED'
 */
export const fetchProfileEpic = action$ =>
    action$.ofType('FETCH_PROFILE')
    .delay(1000) // Demo loading animation
    .mergeMap(action =>
        ajax({
            url: `http://hahow-recruit.herokuapp.com/heroes/${action.id}/profile`,
            crossDomain: true,
            responseType: 'json'
        })
        .map((data) => {
            if (data.status === 200) {
                return fetchProfileFulfilled(action.id, data.response)
            } else {
                return fetchProfileRejected(data.code)
            }
        })
        .catch(error => Observable.of(fetchProfileRejected(error.message)))
        .takeUntil(action$.ofType('FETCH_PROFILE_CANCELED'))
    );
