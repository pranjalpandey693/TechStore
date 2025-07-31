import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Search,User as UserIcon, ShoppingCart, Menu, X } from 'lucide-react';
import { type AppDispatch, type RootState } from '@/redux/store';
import { setSearchTerm } from '@/redux/slices/searchslice';
import { Link,useNavigate } from 'react-router-dom';
import { logoutUser } from '@/redux/slices/authSlice';



const Navigationbar:React.FC = () => {
     
    const dispatch = useDispatch<AppDispatch>()
    const search = useSelector((state:RootState)=> state.search.searchterm)
    const User = useSelector((state:RootState)=>state.auth)

    const handlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchTerm(e.target.value))
    }
    const navigate = useNavigate()
    const hadleLogin = ()=>{
       navigate('/auth/login')
    }
    const handleRegister = ()=>{
      navigate('/auth/register')
    }
    const hadleLogout = ()=>{
      dispatch(logoutUser())
       navigate('/auth/login')
      
    }
      const handleTechStore =()=>{
        navigate('/')
    }
    
    const [isMenuOpen,setIsMenuOpen] = useState(false)

  return (
   <nav className='sticky top-0 z-50 bg-white shadow-lg'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
     <div className='flex justify-between items-center h-16'>
           
        <div className='flex-shrink-0 flex items-center'>
        <h1 onClick={handleTechStore} className='text-2xl font-bold text-blue-600' >TechStore</h1>    
        </div>   

        <div className='hidden md:flex items-center space-x-8'>
         
            <Link to="/orders" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Orders</Link>
            <Link to="/test" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Contact Us</Link>
            {User.user?.isadmin && (
                <Link to="manageProducts" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Manage Products</Link>
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
        {!User.isAuthenticated&&(
            <button onClick={hadleLogin} className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <UserIcon className=''size={20}/>
            <span className=' text-sm'>Login</span>
          </button>
        )}
         {User.isAuthenticated&&(
           <button onClick={hadleLogout} className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <UserIcon className=''size={20}/>
            <span className=' text-sm'>Logout</span>
          </button>
         )}
          {!User.isAuthenticated&&(
            <button onClick={handleRegister} className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <span className=' text-sm'>Register</span>
          </button>
          )}
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
            
               <Link to="/orders" className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>orders</Link>
              
             {!User.isAuthenticated&&(
                <button  className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>Login</button>
             )}
             {!User.isAuthenticated&&(
                <button  className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>Register</button>
             )}
             {User.isAuthenticated&&(
                <button  className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>Logout</button>
             )}
            
                {User.user?.isadmin && (
                <Link to="/manageProducts" className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>Manage Products</Link>
            )}
               <Link to="/about" className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>About us</Link>
            </div>
        </div>
      )}
   </nav>
  );
}

export default Navigationbar;
