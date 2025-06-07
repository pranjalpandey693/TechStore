import { createSlice,} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"


type AuthMode = "login" | "signup"

interface AuthDrawerState {
    isOpen : boolean
    mode: AuthMode
}

const initialState: AuthDrawerState={
    isOpen:false,
    mode:'login'
}

const authDrawerSlice = createSlice({
    name:"authDrawer",
    initialState,
    reducers:{
        openDrawer: (state,action:PayloadAction<AuthMode>)=>{
            state.isOpen =true
            state.mode = action.payload
        },
        closeDrawer: (state)=>{
            state.isOpen=false
        },
        toggleDrawer:(state)=>{
            state.mode = state.mode === "login"? "signup" : "login"
        }
    }

})

export const {openDrawer,closeDrawer,toggleDrawer} = authDrawerSlice.actions
export default authDrawerSlice.reducer
export type {AuthMode,AuthDrawerState}