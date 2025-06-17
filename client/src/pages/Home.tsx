
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { Carousel } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const offerImages = [
  '/offers/offer1.jpg',
  '/offers/offer2.jpg',
  '/offers/offer3.jpg',
];

const HomePage = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex items-center justify-between w-full">
        <div className="flex gap-4">
          <Link to="/" className="font-bold text-xl">MyShop</Link>
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-black">About Us</Link>
          <Link to="/cart" className="text-gray-700 hover:text-black">Cart</Link>
          <Link to="/orders" className="text-gray-700 hover:text-black">Orders</Link>
          {!user && <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>}
          {!user && <Link to="/register" className="text-gray-700 hover:text-black">Register</Link>}
          {user?.isadmin && <Link to="/admin/products" className="text-red-500 hover:text-red-700">Manage Products</Link>}
        </div>
        <Input placeholder="Search products..." className="w-1/3" />
      </nav>

      {/* Carousel */}
      <div className="relative w-full h-64 md:h-96 mt-4 -mb-24 z-10">
        <Carousel >
          {offerImages.map((src, index) => (
            <img key={index} src={src} alt={`Offer ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          ))}
        </Carousel>
      </div>

      {/* Products Grid */}
      <div className="relative z-0 bg-gray-50 pt-32 pb-10 px-4 md:px-10">
        <h2 className="text-2xl font-semibold mb-6">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4">

                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
                <Link to={`/product/${product.id}`}>View</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Us Footer */}
      <footer className="bg-white shadow-inner p-6 mt-auto">
        <h4 className="text-lg font-semibold mb-2">About Us</h4>
        <p className="text-sm text-gray-600">
          Welcome to MyShop, your one-stop destination for amazing deals and quality products. Our mission is to make online shopping enjoyable and secure.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
