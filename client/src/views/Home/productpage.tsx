import { fetchProductById } from '@/redux/slices/productSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Productpage = () => {
    const {currentProduct} = useSelector((state:RootState)=>state.product)
    const {id} = useParams<{id:string}>() 
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        if(id){
            dispatch(fetchProductById(id))
            
            }
    },[id])


  return (
    <div>
      
    </div>
  );
}

export default Productpage;
