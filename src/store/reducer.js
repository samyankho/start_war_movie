const defaultState = {
    likedCharacters: []
}

export default (state = defaultState, action)=>{
    switch (action.type) {
        case 'setLiked': {
            let newState = JSON.parse(JSON.stringify(state))
            newState.likedCharacters.push(action.value)
            return newState
        }
        case 'setDisliked': {
            let newState = JSON.parse(JSON.stringify(state))
            newState.likedCharacters = state.likedCharacters.filter(item => item.id !== action.value.id)
            return newState
        }
        default:
            return state
    }
}