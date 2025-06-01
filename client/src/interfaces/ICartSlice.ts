interface CartItem {
    productId: String
    name:String
    price:number
    quantity:number
    image?:string
}

interface CartState {
    items: CartItem[]
    totalAmount:number
    loading:boolean
}

export type {CartState,CartItem}