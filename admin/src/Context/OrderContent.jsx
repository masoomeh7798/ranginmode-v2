import { createContext, useReducer } from "react"
import { orderReducer } from "./OrderReducer"

const initialState={
    newOrder:false
}

export const OrderContext=createContext(initialState)
export const OrderContextProvider=({children})=>{
    const [state,dispatch]=useReducer(orderReducer,initialState)
    return(
        <OrderContext.Provider value={{newOrder:state.newOrder,dispatch}}>
            {children}
        </OrderContext.Provider>
    )

}