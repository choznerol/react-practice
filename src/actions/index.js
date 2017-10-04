// 由 Container components 使用的 action creators
export const selecteHero = (id) => ({
    type: 'SELECT_HERO',
    id
})

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


// 由 epic 呼叫的 action creators
export const fetchHeros = () => ({
    type: 'FETCH_HEROS'
})

export const fetchHerosFulfilled = (json) => ({
    type: 'FETCH_HEROS_FULFILLED',
    herosArray: json,
    receivedAt: Date.now()
})

export const fetchProfile = (id) => ({
    type: 'FETCH_PROFILE',
    id
})

export const fetchProfileFulfilled = (json, id) => ({
    type: 'FETCH_PROFILE_FULFILLED',
    id,
    json,
    receivedAt: Date.now()
})

export const fetchProfileRejected = (err) => ({
    type: 'FETCH_PROFILE_REJECTED',
    err
})
