const message = (state = null, action) => {
    switch (action.type) {
        case 'PATCH_PROFILE_FULFILLED':
            return '儲存成功'
        case 'CLEAR_MESSAGE':
            return null
        default:
            return state
    }
}

export default message
