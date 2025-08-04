import Footer from '@/components/footer';
import Navigationbar from '@/components/Nav/navigationbar';
import { Outlet } from 'react-router-dom';





const PublicLayout = () => {
    
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Navigationbar />
      <main className='flex-grow'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default PublicLayout;
