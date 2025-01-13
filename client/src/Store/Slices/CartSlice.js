import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isChangedCartQuantity:false,
}
const cartSlice=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        setIsChangedCartQuantity(state){
            state.isChangedCartQuantity=!state.isChangedCartQuantity
        }
    }
})
export const {setIsChangedCartQuantity}=cartSlice.actions
export default cartSlice.reducer