import type { CartItem, CartState } from "@/interfaces";
import { addToCart, checkout, clearCart, deleteFromCart, getCart, updateCart } from "@/services/cartService";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";



const initialState:CartState = {
    items:[],
    totalAmount:0,
    loading:false,
    error:null,
}


export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_,{rejectWithValue})=>{
        try {
            const response = await getCart()
            return response.data
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch cart"
            )
        }
    }
)
export const addItemCart = createAsyncThunk(
    'cart/addItemCart',
    async(item:{
        productId:string
        name:string
        quantity:number
        price:number
    },{rejectWithValue})=>{
        try {
            const response = await addToCart(item)
            return response.data
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add to item cart"
            )
        }
    }
)
export const removeItemCart = createAsyncThunk(
    'cart/removeItemCart',
    async(productId:string,{rejectWithValue})=>{
        try {
           await deleteFromCart(productId)
            return productId
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove item from cart"
            )
        }
    }
)
export const clearEntireCart = createAsyncThunk(
    'cart/clearEntireCart',
    async(_,{rejectWithValue})=>{
        try {
            await clearCart()
            return true
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to clear cart"
            )
        }
    }
)
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async(item:{
        productId:string
        quantity:number
    },{rejectWithValue})=>{
        try {
            const response = await updateCart(item)
            return response.data
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update cart item"
            )
        }
    }
)
export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart',
    async(_,{rejectWithValue})=>{
        try {
            const response = await checkout()
            return response.data
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to checkout"
            )
        }
    }
)

const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem: (state,action:PayloadAction<CartItem>)=>{
            const existingItem = state.items.find(
                (item)=>item.productId === action.payload.productId
            )
            if(existingItem){
                existingItem.quantity += action.payload.quantity
            }else {
                state.items.push(action.payload)
            }
            state.totalAmount += action.payload.price * action.payload.quantity
        },

        removeItem: (state,action:PayloadAction<CartItem>)=>{
            const index = state.items.findIndex(
                (item)=>item.productId === action.payload.productId
            )
            if(index!==-1){
                const item = state.items[index]
                state.totalAmount -= item.price * item.quantity
                state.items.splice(index,1)
            }
        },
        increasequantity:(state,action:PayloadAction<string>)=>{
               const item = state.items.find(
                (item)=>item.productId === action.payload
               )
               if(item){
                item.quantity+=1
                state.totalAmount += item.price
               }
        },
        decreasequantity:(state,action:PayloadAction<string>)=>{
               const item = state.items.find(
                (item)=>item.productId === action.payload
               )
               if(item&&item.quantity>1){
                item.quantity-=1
                state.totalAmount -= item.price
               }else if(item&&item.quantity===1){
                  state.items = state.items.filter(
                    (item)=> item.productId !== action.payload
                  )
                  state.totalAmount-= item.price
               }
        },
        clearError:(state)=>{
            state.error = null
        },
        calculateTotal: (state)=>{
            state.totalAmount = state.items.reduce(
                (total,item)=> total+(item.price* item.quantity),0
            )
        }

    },
    extraReducers: (builder)=>{
        builder
         .addCase(fetchCart.pending,(state)=>{
            state.loading = true
            state.error =null
         })
         .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading= false
            state.items = action.payload.products || []
            state.totalAmount = action.payload.totalCartPrice || 0
         })
         .addCase(fetchCart.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload as string
         })

         builder
         .addCase(addItemCart.pending,(state)=>{
            state.loading = true
            state.error =null
         })
         .addCase(addItemCart.fulfilled,(state,action)=>{
            state.items = action.payload.updatedCart.products
            state.totalAmount = action.payload.updatedCart.totalCartPrice || 0
         })
         .addCase(addItemCart.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
         })

         builder
         .addCase(removeItemCart.pending, (state)=>{
            state.loading= true
            state.error = null
         })
         .addCase(removeItemCart.fulfilled,(state,action)=>{
            
         })
    }
})