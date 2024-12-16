export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                token: action.payload.token,
                user:JSON.stringify(action.payload.user) 
            }
        case 'CLEAR_TOKEN':
            return {
                token: null,
                user: null
            }
        default:
            return state
    }
}