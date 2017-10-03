const heros = (state = {
    isFetching: false,
    // TODO: items 改成物件?
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_HEROS':
            return {
                ...state,
                isFetching: true
            }
            break;
        case 'RECEIVE_HEROS':
            return {
                ...state,
                isFetching: false,
                items: action.herosArray,
                lastUpdated: action.receivedAt
            }
            break;
        default:
            return state
    }
}

export default heros
