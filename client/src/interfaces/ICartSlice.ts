interface CartItem {
    productId: String
    name:String
    price:number
    quantity:number
    image?:string
    status: 'Not_processed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

}

interface ServerCartResponse {
    message:string
    updatedCart:{
        products:CartItem[]
        totalCartPrice:number
    }
}

interface CartState {
    items: CartItem[]
    totalAmount:number
    isAdding: boolean,
    isRemoving: boolean, 
    isUpdating: boolean,
    isClearing: boolean,
    isFetching: boolean,

    error:string| null

    previousState?:{
        items:CartItem[]
        totalAmount:number
    }
}


export type {CartState,CartItem,ServerCartResponse}