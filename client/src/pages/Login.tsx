import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for products
const products = [
  { id: 1, name: "Premium Headphones", price: 299, rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "Electronics" },
  { id: 2, name: "Wireless Mouse", price: 79, rating: 4.2, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop", category: "Electronics" },
  { id: 3, name: "Mechanical Keyboard", price: 199, rating: 4.7, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop", category: "Electronics" },
  { id: 4, name: "Smart Watch", price: 249, rating: 4.3, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", category: "Wearables" },
  { id: 5, name: "Laptop Stand", price: 89, rating: 4.1, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop", category: "Accessories" },
  { id: 6, name: "USB-C Hub", price: 129, rating: 4.4, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop", category: "Accessories" },
];

// Mock carousel offers
const offers = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% Off Electronics",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Tech Gadgets",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On orders over $100",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    cta: "Learn More"
  }
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [isAdmin] = useState(true); // Mock admin state
  const [favorites, setFavorites] = useState(new Set());

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    // Here you would dispatch to Redux store
    console.log('Added to cart:', product);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TechStore</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className='text-gray-700 hover:text-blue-600 px-3 font-medium transition-colors'>Home</Link>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Orders</a>
              {isAdmin && (
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Manage Products</a>
              )}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User size={20} />
                <span className="ml-1 text-sm">Login</span>
              </button>
              <button className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm mr-1">Register</span>
              </button>
              <button className="relative text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Link to="/" className='block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded'>Home</Link>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">About Us</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Orders</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Login</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Register</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Cart ({cartCount})</a>
              {isAdmin && (
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Manage Products</a>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Carousel */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="w-full flex-shrink-0 relative"
              style={{
                backgroundImage: `url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{offer.title}</h2>
                  <p className="text-xl md:text-2xl mb-8">{offer.subtitle}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                    {offer.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-100 p-2 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white opacity-10 hover:opacity-100 p-2 hover: rounded-full transition-all"
        >
          <ChevronRight size={24} />dfdsjfldsjfldsjfldsjfld
        </button>

        {/* Carousel Indicators */}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Section with Overlap */}
      <div className="relative -mt-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart 
                        size={16} 
                        className={favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                      <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-16 bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About TechStore</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're passionate about bringing you the latest technology at unbeatable prices. 
              Founded in 2020, TechStore has become a trusted destination for tech enthusiasts worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-300">
                We source only the highest quality tech products from trusted manufacturers and brands.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-300">
                Get your orders delivered quickly with our expedited shipping options and reliable partners.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-300">
                Our dedicated support team is here to help you with any questions or concerns 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2025 TechStore. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;