import type { Product, ProductState } from "@/interfaces";
import {productApiService} from "@/services/productService"
import { createAsyncThunk, createSlice,  type PayloadAction } from "@reduxjs/toolkit";


const initialState:ProductState ={
    products:[],
    currentProduct:null,
    loading:false,
    error:null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async(_,{rejectWithValue})=>{
        try {
            const response = await productApiService.getProducts()
            return response.data
        } catch (error :any ) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to fetch products"
          ) 
        }
    }
)
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async(productId:string,{rejectWithValue})=>{
        try {
            const response = await productApiService.getProductsById(productId)
            return response.data
        } catch (error :any ) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to fetch product by Id"
          ) 
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async(product:{
        name:string
        price:number
        description:string
        stock:number
        image?:File
    },{rejectWithValue})=>{
        try {
            const response = await productApiService.addProduct(product)
            return response.data
        } catch (error :any ) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to add product"
          ) 
        }
    }
)
export const editProduct = createAsyncThunk(
    'products/editProduct',
    async({productId,updatedFields}:{
        productId:string
        updatedFields:{
        name?:string
        price?:number
        description?:string
        stock?:number
        }
    },{rejectWithValue})=>{
        try {
            const response = await productApiService.updateProduct(productId,updatedFields)
            return response.data
        } catch (error :any ) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to add product"
          ) 
        }
    }
)
export const removeProduct = createAsyncThunk(
    'products/removeProduct',
    async(productId:string,{rejectWithValue})=>{
        try {
          const response=  await productApiService.deleteProduct(productId)
            return  response.data
        } catch (error :any ) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to delete product "
          ) 
        }
    }
)

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        clearError: (state)=>{
            state.error=null
        },
        clearCurrentProduct: (state)=>{
            state.currentProduct= null
        },
        setCurrentProduct: (state,action:PayloadAction<Product>)=>{
            state.currentProduct = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading= true
            state.error= null
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products= action.payload
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false
            state.error= action.payload as string
        })

        builder
        .addCase(fetchProductById.pending,(state)=>{
            state.loading= true
            state.error = null
        })
        .addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading= false
            state.currentProduct = action.payload
        })
        .addCase(fetchProductById.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload as string
        })

        builder
        .addCase(createProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.products.push = action.payload
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false
           state.error = action.payload as string
        })

        builder
        .addCase(editProduct.pending,(state)=>{
            state.loading= true
            state.error = null
        })
        .addCase(editProduct.fulfilled,(state,action)=>{
            state.loading= false
            const index = state.products.findIndex(p=>p.id===action.payload.id)
            if(index!==-1){
                state.products[index] = action.payload
            }
            if(state.currentProduct?.id===action.payload.id){
                state.currentProduct = action.payload
            }
        })
        .addCase(editProduct.rejected,(state,action)=>{
            state.loading= false
            state.error= action.payload as string
        })

        builder
        .addCase(removeProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(removeProduct.fulfilled,(state,action)=>{
            state.loading= false
            state.products = state.products.filter(p=>p.id!==action.payload.id)

            if(state.currentProduct?.id===action.payload.id){
                state.currentProduct = null
            }
        })
        .addCase(removeProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export const {clearCurrentProduct,clearError,setCurrentProduct}= productSlice.actions
export default productSlice.reducer