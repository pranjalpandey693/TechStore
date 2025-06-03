import {API} from './api'

class CartApiService {


async getCart  (){
    return API.get("/cart")
}

async addToCart (item:{
   productId:string
   name:string
   quantity:number
   price:number
}){
    return API.post("/cart/add",item)
}

async deleteFromCart (productId:string){
    return API.delete(`/cart/remove/${productId}`)
}

async clearCart (){
    return API.delete("/cart/clear")
}

async updateCart  (item:{
   productId:string
    quantity:number
}){
    return API.patch(`/cart/update/${item.productId}`,{
        quantity:item.quantity
    })
}

async  checkout(){
    return API.post('/cart/checkout')
}
   
}

export const cartApiService = new CartApiService()






















