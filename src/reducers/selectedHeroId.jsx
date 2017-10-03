const selectedHeroId = (state = -1, action) => {
    switch (action.type) {
        case 'SELECT_HERO':
            return action.selectedHeroId
            break;
        default:
            return state
    }
}

export default selectedHeroId
