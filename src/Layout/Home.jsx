import React from 'react';
import HeroSection from '../Components/HeroSection';
import { Link, useLoaderData } from 'react-router';
import AllProduct from '../Pages/AllProduct';
import Description from '../Pages/Description';
import CustomerFeedback from '../Pages/CustomerFeedback';

const Home = () => {
    const productsData = useLoaderData()
    return (
        <div>
            <HeroSection></HeroSection>
            <div className="py-20 bg-slate-950">
  {/* Section Title */}
  <div className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-black text-white">
      Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Products</span>
    </h2>
    <p className="mt-4 text-xl text-gray-400">Export-quality garments ready for your brand</p>
  </div>

  {/* Animated Background Blobs (Section Level) */}
  <div className="relative">
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
      {productsData.map(product => (
        <div
          key={product.id}
          className="group relative bg-slate-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-4"
        >
          {/* Image Section */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={product.image || "https://images.unsplash.com/photo-1523381294911-8d669ab86a83?w=600&h=700&fit=crop"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">
                {product.category || "Garments"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-white">
            <h3 className="text-2xl font-bold text-amber-300 truncate">{product.title}</h3>

            <div className="mt-4 space-y-3">
              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Price (per piece)</span>
                <span className="text-3xl font-black text-cyan-400">৳{product.price}</span>
              </div>

              {/* Stock */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Available</span>
                <span className={`text-xl font-bold ${product.quantity >= 10 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.quantity} pcs
                </span>
              </div>
            </div>

            {/* View Details Button */}
            <div className="mt-6">
              <Link
                to={`/product/${product._id || product.id}`}
                className="w-full btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg border-none shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Optional: View All Button */}
  <div className="text-center mt-16">
    <Link
      to="/all-product"
      className="inline-block btn btn-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-slate-900 text-white font-bold transition-all"
    >
      View All Products
    </Link>
  </div>
            </div>
            <Description />
            <CustomerFeedback />
        </div>
    );
};

export default Home;