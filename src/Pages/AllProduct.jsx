import React from 'react';
import { Link, useLoaderData } from 'react-router';

const AllProduct = () => {
  const products = useLoaderData()

    return (
        <div className="min-h-screen bg-slate-950 py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Products</span>
          </h1>
          <p className="text-xl text-gray-400">Explore our complete garment collection</p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-slate-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-4"
            >
            
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.productImages || "https://images.unsplash.com/photo-1523381294911-8d669ab86a83?w=600&h=700&fit=crop"}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>

               
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">
                    {product.productOption || "Uncategorized"}
                  </span>
                </div>
              </div>

          
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold text-amber-300 truncate">{product.productName}</h3>

                <div className="mt-4 space-y-3">
           
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-3xl font-black text-cyan-400">৳{product.productPrice}</span>
                  </div>

            
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Available</span>
                    <span className={`text-xl font-bold ${product.quantity >= 100 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.productQuantity} pcs
                    </span>
                  </div>
                </div>

           
                <div className="mt-6">
                  <Link
                    to={`/product-details/${product._id}`}
                    className="w-full btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg border-none shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
    );
};

export default AllProduct;