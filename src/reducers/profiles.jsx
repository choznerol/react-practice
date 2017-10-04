const profiles = (state = {
    isFetching: false,
    items: {}
}, action) => {
    const stateCopy = Object.assign({}, state)
    switch (action.type) {
        case 'FETCH_PROFILE':
            return {
                ...state,
                isFetching: true
            }
        case 'PATCH_PROFILE_REJECTED':
        case 'FETCH_PROFILE_REJECTED':
            console.error(action.err)
            return {
                ...state,
                isFetching: false,
            }
        case 'PATCH_PROFILE_FULFILLED':
            console.log(`更新 ${action.id} 成功：${action.json}`)
            return state
        case 'FETCH_PROFILE_FULFILLED':
            const abilities = action.data
            // unsaved_xxx 將用來暫存尚未儲存的能力值
            const newAbilities = {
                ...abilities,
                'unsaved_str': abilities.str,
                'unsaved_int': abilities.int,
                'unsaved_agi': abilities.agi,
                'unsaved_luk': abilities.luk
            }
            return {
                ...state,
                isFetching: false,
                items: {
                    ...state.items,
                    [action.id]: newAbilities
                }
            }
        case 'INCREASE_UNSAVED_ABILITY':
            stateCopy.items[action.id]['unsaved_' + action.ability] += 1
            return stateCopy
        case 'DECREASE_UNSAVED_ABILITY':
            stateCopy.items[action.id]['unsaved_' + action.ability] -= 1
            return stateCopy
        default:
            return state
    }
}

export default profiles
