import { Router } from "express";
import multer from "multer"
import { addProduct, deleteProduct, getProducts,getProductsById, updateProduct, } from "../controllers";
import { authenticate,isAdmin } from "../middleware";


const router = Router()

const storage= multer.memoryStorage()
const upload = multer({storage})

router.get("/",getProducts)
router.get("/:id",getProductsById)

router.post("/add", authenticate,isAdmin,upload.single("image"),addProduct)
router.put("/update/:id", authenticate,isAdmin,updateProduct)
router.delete("/delete/:id", authenticate,isAdmin,deleteProduct)

export default router