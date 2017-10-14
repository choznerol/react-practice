import { INITIAL_STORE_STATE } from './index.jsx'

const heros = (state = INITIAL_STORE_STATE.heros, action) => {
    switch (action.type) {
        case 'FETCH_HEROS':
            return {
                ...state,
                isFetching: true
            }
            break;
        case 'FETCH_HEROS_FULFILLED':
            return {
                ...state,
                isFetching: false,
                items: action.herosArray,
                lastUpdated: action.receivedAt
            }
            break;
        case 'FETCH_HEROS_CANCELED':
        case 'FETCH_HEROS_REJECTED':
            return {
                ...state,
                isFetching: false
            }
            break;
        default:
            return state
    }
}

export default heros
