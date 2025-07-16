import type { ProductSearchParams } from '@/interfaces'
import {API} from './api'


class ProductApiService {

    async getProducts (params: ProductSearchParams = {}){
         
        const queryParams = new URLSearchParams()

        Object.entries(params).forEach(([key,value])=>{
            if(value !== undefined && value!==null && value!==''){
                queryParams.append(key,value.toString())
            }
        })

        const queryString = queryParams.toString()
        const url = queryString ? `/products?${queryString}`: '/products'
        return API.get(url)
    }
    
     async getProductsById (productId:string){
        return API.get(`/products/${productId}`)
    }
    
     async addProduct (product:{
        name:string
        price:number
        description:string
        stock:number
        image?:File
    }){
        const formData = new FormData()
         formData.append("name",product.name)
        formData.append("price",product.price.toString())
        formData.append("description",product.description)
        formData.append("stock",product.stock.toString())
    
        if(product.image) {
            formData.append("image",product.image)
        }
    
        return API.post("/products/add",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }
    
     async updateProduct  (
        productId:string,
        updatedFields:{
            name?: string;
        description?: string;
        price?: number;
        stock?:number
        }
    ){
        return API.patch(`/products/update/${productId}`,updatedFields)
    }
    
     async deleteProduct  (productId:string){
        return API.delete(`/products/delete/${productId}`)
    }
}

export const productApiService = new ProductApiService()
