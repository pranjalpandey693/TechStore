import type {  CartState, ServerCartResponse } from "@/interfaces";
import { cartApiService} from "@/services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";




const initialState:CartState = {
    items:[],
    totalAmount:0,
    isAdding: false,
    isRemoving: false, 
    isUpdating: false,
    isClearing: false,
    isFetching: false,
    error:null,
}


export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_,{rejectWithValue})=>{
        try {
            const response = await cartApiService.getCart()
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
            const response = await cartApiService.addToCart(item)
            toast.success('Item Added')
            return response.data
        } catch (error:any) {
            toast.error('Add Item Failed')
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
         const response =   await cartApiService.deleteFromCart(productId)
           toast.success('Item Removed')
             return response.data
        } catch (error:any) {
            toast.error('Remove Item Failed')
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
          const response =   await cartApiService.clearCart()
           toast.success('Cart cleared')
            return response.data
        } catch (error:any) {
            toast.error('failed to clear cart')
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
            const response = await cartApiService.updateCart(item)
            return response.data
        } catch (error:any) {
            toast.error('failed to update quantity')
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
            const response = await cartApiService.checkout()
            toast.success('successfully checkedout cart')
            return response.data
        } catch (error:any) {
            toast.error('failed to checkout cart')
            return rejectWithValue(
                error.response?.data?.message || "Failed to checkout"
            )
        }
    }
)


const createBackupstate = (state:CartState)=>({
    items:[...state.items],
    totalAmount: state.totalAmount
    
})

const applyServerResponse = (state:CartState,payload:ServerCartResponse)=>{
    if(payload.updatedCart){
        state.items = payload.updatedCart.products
        state.totalAmount= payload.updatedCart.totalCartPrice
    }
}

const restoreFromBackup = (state:CartState)=>{
    if(state.previousState){
        state.items= state.previousState.items
        state.totalAmount = state.previousState.totalAmount
        delete state.previousState
    }
}


const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
       
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
            state.isFetching = true
            state.error =null
         })
         .addCase(fetchCart.fulfilled,(state,action)=>{
            state.isFetching= false
            applyServerResponse(state,action.payload)
         })
         .addCase(fetchCart.rejected,(state,action)=>{
            state.isFetching= false
            state.error = action.payload as string || 'Failed to fetch cart'
         })

         builder
         .addCase(addItemCart.pending,(state)=>{
            state.isAdding = true
            state.error =null
            state.previousState = createBackupstate(state)

           
         })
         .addCase(addItemCart.fulfilled,(state,action)=>{
            state.isAdding = false 
            applyServerResponse(state,action.payload)
         })
         .addCase(addItemCart.rejected,(state,action)=>{
            state.isAdding = false
            state.error = action.payload as string || 'failed to add item to cart'
            restoreFromBackup(state)
         })

         builder
         .addCase(removeItemCart.pending, (state)=>{
            state.isRemoving= true
            state.error = null
            state.previousState = createBackupstate(state)



         })
         .addCase(removeItemCart.fulfilled,(state,action)=>{
            state.isRemoving = false
            applyServerResponse(state,action.payload)
            
         })
         .addCase(removeItemCart.rejected,(state,action)=>{
               state.isRemoving = false
               state.error = action.payload as string || 'failed to remove item from cart'
               restoreFromBackup(state)

         })

         builder
         .addCase(updateCartItem.pending,(state)=>{
            state.isUpdating = true
            state.error = null
            state.previousState = createBackupstate(state)



         })
         .addCase(updateCartItem.fulfilled,(state,action)=>{
              state.isUpdating = false
              applyServerResponse(state,action.payload)
         })
         .addCase(updateCartItem.rejected,(state,action)=>{
            state.isUpdating = false
            state.error = action.payload as string || 'failed to update item '
            restoreFromBackup(state)

      })

         builder
         .addCase(clearEntireCart.pending,(state)=>{
            state.isClearing = true
            state.error = null
            state.previousState = createBackupstate(state)

            state.items= []
            state.totalAmount = 0
         })
         .addCase(clearEntireCart.fulfilled,(state,action)=>{
              state.isClearing = false
              applyServerResponse(state,action.payload)
         })
         .addCase(clearEntireCart.rejected,(state,action)=>{
            state.isClearing = false
            state.error = action.payload as string || 'failed to clear cart '
            restoreFromBackup(state)

      })
    }
})


export const {clearError,calculateTotal}=CartSlice.actions
export default  CartSlice.reducer