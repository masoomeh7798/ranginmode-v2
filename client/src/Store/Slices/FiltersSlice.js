import { createSlice } from "@reduxjs/toolkit";
const initialState={
    price:[0,1000000],
    cat:null,
    brand:null
}
const filterSlice=createSlice({
    name:'filterSlice',
    initialState,
    reducers:{
        getPrice(state,action){
            state.price=action.payload

        },
        getCat(state,action){
            state.cat=action.payload
        },
        getBrand(state,action){
            state.brand=action.payload
        }
    }
})
export const {getPrice,getCat,getBrand}=filterSlice.actions
export default filterSlice.reducer