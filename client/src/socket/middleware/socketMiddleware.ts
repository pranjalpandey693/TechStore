import type { Middleware } from "@reduxjs/toolkit";
import socket from "../socket";
import { setCart, setCartError } from "@/redux/slices/CartSlice";
import type { CartState } from "@/interfaces";

const socketMiddleware:Middleware = (storeAPI)=> {
    socket.on('cart-updated',(cartData:CartState)=>{
        storeAPI.dispatch(setCart(cartData))
    })

    socket.on('cart-error',(error:string)=>{
        storeAPI.dispatch(setCartError(error))
    })

    return (next)=> (action)=>{
        const result = next(action)
    }
}