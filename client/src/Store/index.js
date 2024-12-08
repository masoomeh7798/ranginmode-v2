import authSliceReducer from "./Slices/AuthSlice";
import filtersSliceReducer from "./Slices/FiltersSlice";
import cartSliceReducer from "./Slices/CartSlice";
import favoriteSliceReducer from "./Slices/FavoriteSlice"
import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        cart: cartSliceReducer,
        filters: filtersSliceReducer,
        favorite:favoriteSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'], 
          },
        }),
})
const persistor = persistStore(store);

export default store
export { persistor }


