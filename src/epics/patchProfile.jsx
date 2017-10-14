import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { patchProfileFulfilled,
         patchProfileRejected,
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


export default patchProfileEpic