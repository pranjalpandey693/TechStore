import {API} from './api'

export const getCart = ()=>{
    return API.get("/cart")
}

export const addToCart = (item:{
   productId:string
   name:string
   quantity:string
   price:number
})=>{
    return API.post("/cart/add",item)
}

export const deleteFromCart = (productId:string)=>{
    return API.delete(`/cart/remove/${productId}`)
}

export const clearCart = ()=>{
    return API.delete("/cart/clear")
}

export const updateCart = (item:{
   productId:string
    quantity:number
})=>{
    return API.patch(`/cart/update/${item.productId}`,{
        quantity:item.quantity
    })
}

export  const checkout = ()  =>{
    return API.post('/cart/checkout')
}