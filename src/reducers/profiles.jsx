import { INITIAL_STORE_STATE } from './index'


const profiles = (state = INITIAL_STORE_STATE.profiles, action) => {
    const stateCopy = Object.assign({}, state)
    switch (action.type) {

        // 抓取能力值
        case 'FETCH_PROFILE':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_PROFILE_REJECTED':
            return {
                ...state,
                isFetching: false,
            }
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

        // 更新能力值
        case 'PATCH_PROFILE':
            return {
                ...state,
                isSubmitting: true
            }
        case 'PATCH_PROFILE_REJECTED':
        case 'PATCH_PROFILE_FULFILLED':
            return {
                ...state,
                isSubmitting: false
            }

        // 暫存前端修改的能力值（未送出儲存）
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
