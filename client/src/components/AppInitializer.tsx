
import { fetchProducts } from "@/redux/slices/productSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




const AppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(fetchProducts({}))
         
        
    },[dispatch])
  return null
}

export default AppInitializer;
