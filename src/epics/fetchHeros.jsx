import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { hideLoading } from 'react-redux-loading-bar'
import { fetchHerosFulfilled,
         fetchHerosRejected } from '../actions'


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
                    Observable.of(fetchHerosrejected(data.code)),
                    Observable.of(hideLoading())
                )
            }
        })
        .catch(error => Observable.of(fetchHerosrejected(error.message), hideLoading()))
    );


export default fetchHerosEpic
