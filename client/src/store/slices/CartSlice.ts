import type { CartItem, CartState } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



const initialState:CartState = {
    items:[],
    totalAmount:0,
    loading:false
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action:PayloadAction<CartItem>)=>{
            const existingItem = state.items.find(
                (item)=> item.productId === action.payload.productId
            )
            if(existingItem){
                existingItem.quantity += action.payload.quantity
            }else{
                state.items.push(action.payload)
            }
            state.totalAmount += action.payload.price * action.payload.quantity

        },
        

    }
})