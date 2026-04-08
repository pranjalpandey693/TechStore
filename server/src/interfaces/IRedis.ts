export interface RedisCartItem {
     productId: string
       name:string 
        quantity: number
        price: number
        totalprice: number
       
}

export interface RedisCart {
    products: RedisCartItem[],
    totalCartPrice: Number


}

