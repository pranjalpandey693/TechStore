import type { SearchState } from "@/interfaces";
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";


const initialState :SearchState = {
    searchterm :''
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearchTerm:(state,action:PayloadAction<string>)=>{
            state.searchterm = action.payload
        },
        clearSearchTerm:(state)=>{
            state.searchterm = ''
        }
    }
})

export const {setSearchTerm,clearSearchTerm} = searchSlice.actions
export default searchSlice.reducer