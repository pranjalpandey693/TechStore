export interface RedisCartItem {
     product: string
        quantity: number
        price: number
        totalprice: number
        status: string
}

export interface RedisCart {
    products: RedisCartItem[],
    totalCartPrice: Number

}

