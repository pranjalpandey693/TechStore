interface Product {
    id:string
    name:string
    price:number
    description:string
    stock:number
    image?:string |File
}

interface ProductState {
    products: Product[]
    currentProduct: Product|null
    loading:boolean
    error:string|null
}

export type {Product,ProductState}