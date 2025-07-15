import type { User } from '@/interfaces';
import React from 'react';

interface Props {
    user:User
}

const Navigationbar:React.FC<Props> = ({user}) => {
  return (
   <nav className='sticky top-0 z-50 bg-white shadow-lg'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
     <div className='flex justify-between items-center h-16'>
           
           
        </div>
    </div>

   </nav>
  );
}

export default Navigationbar;
