import { createSlice } from "@reduxjs/toolkit";
const initialState={
    checkFavorite:false,
}
const favoriteSlice=createSlice({
    name:'favoriteSlice',
    initialState,
    reducers:{
        setCheckFavorite(state,action){
            state.checkFavorite=action.payload
        }
        
    }
})
export const {setCheckFavorite}=favoriteSlice.actions
export default favoriteSlice.reducer