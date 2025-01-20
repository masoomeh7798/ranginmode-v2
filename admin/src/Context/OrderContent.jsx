import { createContext, useReducer } from "react"
import { orderReducer } from "./OrderReducer"

const initialState={
    newOrder:false,
    numOfNewOrders:0
}

export const OrderContext=createContext(initialState)
export const OrderContextProvider=({children})=>{
    const [state,dispatch]=useReducer(orderReducer,initialState)
    return(
        <OrderContext.Provider value={{newOrder:state.newOrder,numOfNewOrders:state.numOfNewOrders,dispatch}}>
            {children}
        </OrderContext.Provider>
    )

}