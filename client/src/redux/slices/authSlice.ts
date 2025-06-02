import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/interfaces";

const initialState :AuthState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        startAuth: (state)=>{
            state.loading= true
            state.error= null
        },
        setCredentials:(state,action:PayloadAction<{user:string}>)=>{
            state.user = action.payload.user
            state.isAuthenticated=true
            state.loading=false
            state.error=null
        
        },
        authFailed:(state,action:PayloadAction<string>)=>{
               state.error=action.payload
               state.loading= false
        },
        logout:(state)=>{
            state.user = null
            state.isAuthenticated=false
            state.loading=false
            state.error=null
        }
    }

})

export const {setCredentials,startAuth,authFailed,logout} = authSlice.actions
export default authSlice.reducer