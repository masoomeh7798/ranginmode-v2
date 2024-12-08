import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isRemoved:1,
    isAdded:1,
    dynamicQunatityD:true,
}
const cartSlice=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        setIsRemoved(state,action){
            state.isRemoved=action.payload
        },
        setIsAdded(state,action){
            state.isAdded=action.payload
        },
        changedQuantity(state,action){
            state.dynamicQunatityD=action.payload
        },
     
    }
})
export const {setIsRemoved,setIsAdded,changedQuantity}=cartSlice.actions
export default cartSlice.reducer