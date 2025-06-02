import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import cartReducer from './slices/CartSlice'
import authDrawerReducer from './slices/authDrawerSlice'

export const store = configureStore({
    reducer :{
        auth: authReducer,
        cart:cartReducer,
        authDrawer:authDrawerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch