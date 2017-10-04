//
// 由 Container components 使用的 action creators
//

// 送出抓取 profile 請求，之後 epics 檢查了 store 中確實沒有資料才真的抓取
export const fetchProfileIfNeeded = (id) => ({
    type: 'FETCH_PROFILE_IF_NEEDED',
    id
})

export const increaseUnsavedAbility = (id, ability) => ({
    type: 'INCREASE_UNSAVED_ABILITY',
    id,
    ability
})

export const decreaseUnsavedAbility = (id, ability) => ({
    type: 'DECREASE_UNSAVED_ABILITY',
    id,
    ability
})

export const patchProfile = (id, data) => ({
    type: 'PATCH_PROFILE',
    id,
    data
})


//
// 由 epic 呼叫的 action creators
//
export const fetchHeros = () => ({
    type: 'FETCH_HEROS'
})

export const fetchHerosFulfilled = (data) => ({
    type: 'FETCH_HEROS_FULFILLED',
    herosArray: data,
    receivedAt: Date.now()
})

export const fetchProfile = (id) => ({
    type: 'FETCH_PROFILE',
    id
})

export const fetchProfileFulfilled = (data, id) => ({
    type: 'FETCH_PROFILE_FULFILLED',
    id,
    data,
    receivedAt: Date.now()
})

export const fetchProfileRejected = (err) => ({
    type: 'FETCH_PROFILE_REJECTED',
    err
})

export const patchProfileFulfilled = (data, id) => ({
    type: 'PATCH_PROFILE_FULFILLED',
    id,
    data,
    receivedAt: Date.now()
})

export const patchProfileRejected = (err) => ({
    type: 'PATCH_PROFILE_REJECTED',
    err
})
