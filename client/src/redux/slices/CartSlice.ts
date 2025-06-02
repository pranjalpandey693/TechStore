import type { CartItem, CartState } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



const initialState:CartState = {
    items:[],
    totalAmount:0,
    loading:false,
    error:null
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action:PayloadAction<CartItem>)=>{
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
        removeItem: (state,action:PayloadAction<CartItem>)=>{
            const index = state.items.findIndex(
                (item)=> item.productId === action.payload.productId
            )
            if(index !==-1){
                const item = state.items[index]
                state.totalAmount -= item.price * item.quantity
                state.items.splice(index,1)
            }
        },
        setCartLoading: (state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        },
        setCartError: (state,action:PayloadAction<string>)=>{
            state.error = action.payload
        },

        increaseQuantity:(state,action:PayloadAction<string>)=>{
            const item = state.items.find(
                (item)=> item.productId === action.payload
            )
            if(item){
                item.quantity += 1
                state.totalAmount += item.price
            }
        },

        decreaseQuantity:(state,action:PayloadAction<string>)=>{
            const item = state.items.find(
                (item)=> item.productId === action.payload
            )
            if(item&&item.quantity>1){
                item.quantity -= 1
                state.totalAmount -= item.price
            }else if(item&&item.quantity===1){
               state.items = state.items.filter(
                (item)=> item.productId !== action.payload
               )
                state.totalAmount -= item.price
            }
        },
        setCart:(state,action:PayloadAction<CartState>)=>{
            return {...state,...action.payload,loading:false,error:null}
        }
        

        


    }
})

export const {addItem,removeItem,setCartLoading,setCartError,increaseQuantity,decreaseQuantity,setCart} = CartSlice.actions
export default CartSlice.reducer