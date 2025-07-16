import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import cartReducer from './slices/CartSlice'
import authDrawerReducer from './slices/authDrawerSlice'
import productReducer from './slices/productSlice'
import searchReducer from './slices/searchslice'

export const store = configureStore({
    reducer :{
        auth: authReducer,
        cart:cartReducer,
        authDrawer:authDrawerReducer,
        product:productReducer,
        search: searchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch