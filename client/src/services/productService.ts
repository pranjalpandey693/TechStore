import {API} from './api'

export const getProducts = ()=>{
    return API.get("/products")
}

export const getProductsById = (productId:string)=>{
    return API.get(`/products/${productId}`)
}

export const addProduct = (product:{
    name:string
    price:number
    description:string
    stock:number
    image?:File
})=>{
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

export const updateProduct = (
    productId:string,
    updatedFields:{
        name?: string;
    description?: string;
    price?: number;
    stock?:number
    }
)=>{
    return API.patch(`/products/update/${productId}`,updatedFields)
}

export const deleteProduct = (productId:string)=>{
    return API.delete(`/products/delete/${productId}`)
}