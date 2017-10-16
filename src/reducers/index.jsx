import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import heros from './heros'
import profiles from './profiles'
import message from './message'



/**
 * 整個 Redux Store 的資料結構及初始狀態
 * @type {Object}
 */
export const INITIAL_STORE_STATE = {

    // Message 元件據此顯示「更新成功」、「抓取失敗」等提示訊息框
    message: {
        visible: false,
        text: null,
        // Bootstrap 顏色風格，如 primary, warning, success ...等等
        bs_style: 'primary'
    },

    // HeroList 元件據此顯示所有 hero 的名稱與圖片
    heros: {
        isFetching: false,
        items: []
    },

    // HeroProfile 元件據此顯示 hero 的能力值
    profiles: {
        isFetching: false,
        isSubmitting: false,
        // TODO: Rename to `abilities`
        items: {}
    }
}



const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    heros,
    profiles,
    message
});

export default rootReducer;
