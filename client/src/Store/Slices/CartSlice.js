import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isChangedCartQuantity:false,
    // isAdded:false,
    // dynamicQunatityD:true,
}
const cartSlice=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        // setIsRemoved(state){
        //     state.isRemoved=!state.isRemoved
        // },
        // setIsAdded(state){
        //     state.isAdded=!state.isAdded
        // },
        // changedQuantity(state,action){
        //     state.dynamicQunatityD=action.payload
        // },
        setIsChangedCartQuantity(state){
            state.isChangedCartQuantity=!state.isChangedCartQuantity
        }
    }
})
export const {setIsChangedCartQuantity}=cartSlice.actions
export default cartSlice.reducer