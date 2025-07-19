import type { User } from '@/interfaces';
import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Search,User as UserIcon, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
import type { RootState } from '@/redux/store';
import { setSearchTerm } from '@/redux/slices/searchslice';

interface Props {
    user?:User
}

const Navigationbar:React.FC<Props> = ({user}) => {
     
    const dispatch = useDispatch()
    const search = useSelector((state:RootState)=> state.search.searchterm)

    const handlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchTerm(e.target.value))
    }
   
    const [isMenuOpen,setIsMenuOpen] = useState(false)

  return (
   <nav className='sticky top-0 z-50 bg-white shadow-lg'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
     <div className='flex justify-between items-center h-16'>
           
        <div className='flex-shrink-0 flex items-center'>
        <h1 className='text-2xl font-bold text-blue-600' >TechStore</h1>    
        </div>   

        <div className='hidden md:flex items-center space-x-8'>
            <a href="#" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Home</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Orders</a>
            <a href="#" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>About Us</a>
            {user?.isadmin && (
                <a href="#" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Manage Products</a>
            )}
        </div>

        <div className='hidden md:flex flex-1 max-w-lg mx-8'>
            <div className=' relative w-full'>
                <input type="text" 
                        value={search}
                        onChange={handlechange}
                       placeholder='Search Products...'
                       className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <Search className='absolute left-3 top-2.5  h-5 w-5 text-gray-400'/>
             </div> 
        </div>

        <div className='hidden md:flex items-center space-x-4'>
          <button className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <UserIcon className=''size={20}/>
            <span className=' text-sm'>Login</span>
          </button>
          <button className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <span className=' text-sm'>Register</span>
          </button>
          <button className=' text-gray-700 hover:text-blue-600 p-2 rounded-lg  hover:bg-gray-100 transition-colors'>
             <ShoppingCart size={20}/>
          </button>
         </div>

         <div className='md:hidden'>
            <button onClick={()=>setIsMenuOpen(!isMenuOpen)}
                className='text-gray-700 hover:text-gray-900 p-2'>
                    {isMenuOpen? <X size={20}/> : <Menu size={20} /> }
                </button>

         </div>
     </div>
  </div>
      
      {isMenuOpen&&(
        <div className='md:hidden bg-white border-t'>
            <div className='px-4 py-2 space-y-1'>
                 <div className=' relative mb-4'>
                <input type="text" 
                        value={search}
                        onChange={handlechange}
                       placeholder='Search Products...'
                       className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg'
                />
                <Search className='absolute left-3 top-2.5  h-5 w-5 text-gray-400'/>
             </div> 

            </div>
        </div>
      )}
   </nav>
  );
}

export default Navigationbar;
jreljle;trt