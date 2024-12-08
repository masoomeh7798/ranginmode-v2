import { createSlice } from "@reduxjs/toolkit";
const initialState={
    cat:null,
    brand:null
}
const filterSlice=createSlice({
    name:'filterSlice',
    initialState,
    reducers:{
        getCat(state,action){
            state.cat=action.payload
        },
        getBrand(state,action){
            state.brand=action.payload
        }
    }
})
export const {getCat,getBrand}=filterSlice.actions
export default filterSlice.reducer