interface Product {
    _id:string
    name:string
    price:number
    description:string
    stock:number
    image?:string 
}

interface ProductState {
    products: Product[]
    total:number
    currentProduct: Product|null
    loading:boolean
    error:string|null
}



interface ProductSearchParams {
    search?: string
    minPrice?:number
    maxPrice?: number
    sort?:string
    page?:number
    limit?:number
}

export type {Product,ProductState,ProductSearchParams}