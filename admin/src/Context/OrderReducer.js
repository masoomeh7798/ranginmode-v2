export const orderReducer=(state,action)=>{
     switch (action.type) {
        case 'NEW_ORDER':       
        return { ...state, newOrder: !state.newOrder }
        case 'NUM_OF_NEW_ORDERS':
         return {...state,numOfNewOrders:action.payload}  
        default:
           return state
     }
}