import { Request, Response } from "express";
import { Product } from "../models";
import { FilterQuery } from "mongoose";
import { IProduct } from "../interfaces";

// export const getProducts = async (_req: Request, res: Response) => {
//   try {
//     const products = await Product.find();

//     const formattedProducts = products.map((product)=>({
//         _id: product.id,
//         name: product.name,
//         price:product.price,
//         description: product.description,
//         stock:product.stock,
//         image: product.image ? `data:image/png;base64,${product.image.toString("base64")}` :null
//     }))
//     res.status(200).json(formattedProducts);
//   } catch (error) {
//    res.status(500).json({message: "Failed to fetch products"})
//   }
// };

export const getProducts = async (req:Request,res: Response) =>{
    try {
        const {search, minPrice,maxPrice,sort,page=1,limit=10}= req.query

        const query:FilterQuery<IProduct> = {}

        if(typeof search === "string" && search.trim() !== ""){
        query.$or = [
            {name: {$regex: search, $options:"i"}},
            {description: {$regex: search, $options:"i"}},
        ]}

        if(minPrice||maxPrice){
            query.price = {}
            if(typeof minPrice === "string") query.price.$gte = Number(minPrice)
            if(typeof maxPrice === "string") query.price.$lte = Number(maxPrice)
        }

        const sortBy: Record<string,1|-1> = {}
        if(sort === "price_asc") sortBy.price = 1
      else    if(sort === "price_desc") sortBy.price = -1

      const skip = (Number(page) -1) * Number(limit)
      const products = await Product.find(query)
         .sort(sortBy)
         .skip(skip)
         .limit(Number(limit))

         const formattedProducts = products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image
              ? `data:image/png;base64,${product.image.toString("base64")}`
              : null,
          }));
      

         const total = await Product.countDocuments(query)

         res.json({products: formattedProducts,total})



    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          } else {
            res.status(500).json({ error: "Unknown error occurred." });
          }
        }
    
}

export const getProductsById = async (req: Request ,res: Response)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {  
            res.status(404).json({message: "Product not found"})
            return
        }

        const imageBase64 = product.image ? product.image.toString("base64") : null ;
        
        res.status(200).json({
            _id: product.id,
            name: product.name,
            price:product.price,
            description: product.description,
            stock:product.stock,
            image: imageBase64? `data:image/png;base64,${imageBase64}`: null
        })
    } catch (error) {
   res.status(500).json({message: "Failed to fetch product"})
        
    }
}


export const addProduct = async (req: Request,res:Response)=>{
    try {
        const {name,description,price,stock} = req.body
        const image = req.file ? req.file.buffer : null;

        if(!name|| !description|| !price|| !stock || !image){
            res.status(400).json({message:"All fields are required"})
            return
        }
        
        const product = new Product({ name, description,price,stock,image })
        await product.save()
        res.status(201).json(product)
    } catch (error) {
   res.status(500).json({message: "Error adding product"})
        
    }
}

export const updateProduct = async (req: Request,res:Response)=>{
    try {
        const {name,description,price,stock} = req.body
     
        const product = await Product.findById(req.params.id)
        if(!product) {  
            res.status(404).json({message: "Product not found"})
            return
        }
        
        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.stock = stock || product.stock
       
        await product.save()
        res.status(201).json(product)
    } catch (error) {
   res.status(500).json({message: "Error updating product"})
        
    }
}
export const deleteProduct = async (req: Request,res:Response)=>{
    try {
     
        const product = await Product.findById(req.params.id)
        if(!product) {  
            res.status(404).json({message: "Product not found"})
            return
        }
        
        await product.deleteOne()
        res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
   res.status(500).json({message: "Error deleting product"})
        
    }
}