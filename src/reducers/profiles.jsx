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
        case 'FETCH_PROFILE_REJECTED':
            console.error(action.err)
            return {
                ...state,
                isFetching: false,
            }
        case 'FETCH_PROFILE_FULFILLED':
            const abilities = action.json
            // unsaved_xxx 將用來儲存尚未 patch 的能力值
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
