import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { patchProfileFulfilled,
         patchProfileRejected,
         fetchProfileFulfilled,
         hideSubmitLoading } from '../actions'


/**
 * 更新一位英雄的資料，成功後 dispatch 'HIDE_SUBMIT_LOADING' 和 'PATCH_PROFILE_FULFILLED'
 */

const patchProfileEpic = (action$, store) =>
    action$.ofType('PATCH_PROFILE')
    .switchMap(action =>
        ajax({
            url: `https://hahow-recruit.herokuapp.com/heroes/${action.id}/profile`,
            method: 'PATCH',
            body: action.updates,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .mergeMap((res) => {
            if (res.status === 200) {
                return Observable.concat(
                    Observable.of(patchProfileFulfilled(res, action.id, action.updates)),
                    /** 同步為更新後的能力值 */
                    Observable.of(fetchProfileFulfilled(action.id, action.updates))
                )
            } else {
                return Observable.of(patchProfileRejected(res.code))
            }
        })
        .catch(error => Observable.of(patchProfileRejected(error)))
    );


export default patchProfileEpic
