
export const increaseUnsavedAbility = makeActionCreator('INCREASE_UNSAVED_ABILITY', 'id', 'ability')

export const decreaseUnsavedAbility = makeActionCreator('DECREASE_UNSAVED_ABILITY', 'id', 'ability')

export const patchProfile = makeActionCreator('PATCH_PROFILE', 'id', 'updates')

export const updateMessage = makeActionCreator('UPDATE_MESSAGE', 'text', 'bs_style')

export const clearMessage = makeActionCreator('CLEAR_MESSAGE')


/** List Heroes */
export const fetchHeros = makeActionCreator('FETCH_HEROS')

export const fetchHerosRejected = (err) => ({
    type: 'FETCH_HEROS_REJECTED',
    message_text: '獲取英雄資料失敗',
    err
})

export const fetchHerosFulfilled = (data) => ({
    type: 'FETCH_HEROS_FULFILLED',
    herosArray: data
})


/** Profile of Hero */
export const fetchProfileIfNeeded = makeActionCreator('FETCH_PROFILE_IF_NEEDED', 'id')

export const fetchProfile = makeActionCreator('FETCH_PROFILE', 'id')

export const fetchProfileFulfilled = makeActionCreator('FETCH_PROFILE_FULFILLED', 'id', 'data')

export const fetchProfileRejected = (err) => ({
    type: 'FETCH_PROFILE_REJECTED',
    message_text: '抓取能力值失敗',
    err
})


/** Patch Hero's Profile */
export const patchProfileFulfilled = (res, id, updates) => ({
    type: 'PATCH_PROFILE_FULFILLED',
    id,
    res,
    updates,
    message_text: '更新成功！',
    receivedAt: Date.now()
})

export const patchProfileRejected = (err) => ({
    type: 'PATCH_PROFILE_REJECTED',
    message_text: '更新能力值失敗',
    err
})


/**
 * 自動產生 action creater 減少 boilerplate（goo.gl/dgtbzT）
 * @param  {string} type     action type
 * @param  {string} argNames 產生的 action creater 接收的參數，也是 action 的其他鍵值
 * @return {Function}        action creater，產生 action 物件的函數
 */
function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}
