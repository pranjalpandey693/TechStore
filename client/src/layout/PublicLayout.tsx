import Footer from '@/components/footer';
import Navigationbar from '@/components/Nav/navigationbar';
import { Outlet } from 'react-router-dom';


import type { User } from '@/interfaces';


const PublicLayout = () => {
     const testuser :User = {
        name : 'jon don',
        email: 'jondon@gmail.com',
        isadmin:false
      }
  return (
    <div className='flex flex-col min-h-screen'>
      <Navigationbar user={testuser}/>
      <main className='flex-grow'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default PublicLayout;
