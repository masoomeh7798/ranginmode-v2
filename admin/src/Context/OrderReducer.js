export const orderReducer=(state,action)=>{
     switch (action.type) {
        case 'NEW_ORDER':       
        return { ...state, newOrder: !state.newOrder }
  
        default:
           return state
     }
}