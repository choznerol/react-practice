// Action Creators
export const selecteHero = (id) => ({
    type: 'SELECT_HERO',
    selectedHeroId: id
})

export const requestHeros = () => ({
    type: 'REQUEST_HEROS'
})

export const recieveHeros = (json) => ({
    type: 'RECEIVE_HEROS',
    herosArray: json,
    receivedAt: Date.now()
})

// 非同步操作
export const fetchHeros = dispatch => {
    dispatch(requestHeros())
    return fetch('http://hahow-recruit.herokuapp.com/heroes')
        .then(response => response.json())
        .then(json => dispatch(receivePosts(json)))
}
