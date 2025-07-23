import React from 'react';
import { Link } from 'react-router-dom';

const Footer:React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
    <div className='bg-gray-800 text-white py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
            <p>2025 Techstore. All rights reserved.</p>
            <div className='mt-4 space-x-6'>
                 <Link to="/" className='text-gray-300 hover:text-white transition-colors'>Privacy Policy</Link>
                 <Link to="/" className='text-gray-300 hover:text-white transition-colors'>Terms of Service</Link>
                 <Link to="/" className='text-gray-300 hover:text-white transition-colors'>Contact Us</Link>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Footer;
