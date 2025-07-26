
import { Outlet } from 'react-router-dom';

const Authlayout = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded shadow'>
         <Outlet/>
      </div>
    </div>
  );
}

export default Authlayout;
