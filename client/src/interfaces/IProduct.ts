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

interface ProductSearchParams {
    search?: string
    minPrice?:number
    maxPrice?: number
    sort?:string
    page?:number
    limit?:number
}

export type {Product,ProductState,ProductSearchParams}