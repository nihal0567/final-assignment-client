import React from 'react';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

const BookingForm = () => {
    const {user} = useAuth()
    return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-12">
          Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Order</span>
        </h1>

        <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12">
          <form  className="space-y-8">

            {/* Read-only Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/10">
              <div>
                <label className="text-gray-400 text-sm">Product</label>
                <p className="text-xl font-bold text-amber-300"></p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Unit Price</label>
                <p className="text-xl font-bold text-cyan-400">৳</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Buyer Email</label>
                <input defaultValue={user.email}
                  type="email"
                  readOnly
                  className="w-full bg-slate-800/50 px-5 py-3 rounded-xl text-gray-300"
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>
            </div>

            {/* Quantity & Total Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Total Order Price</label>
                <input
                  type="text"
                  readOnly
                  className="w-full px-6 py-4 bg-slate-800/80 rounded-xl text-2xl font-bold text-cyan-400"
                />
              </div>
            </div>

            {/* Contact & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  rows="3"
                  required
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition resize-none"
                ></textarea>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-300 mb-2">Additional Notes / Instructions (Optional)</label>
              <textarea
                name="notes"
                rows="4"
                placeholder="Color preference, size breakdown, special packaging, etc."
                className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xl py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Confirm Booking
              </button>
              <Link
                className="flex-1 text-center btn btn-outline border-2 border-white/30 hover:bg-white hover:text-slate-900 font-bold text-xl py-5 rounded-xl"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;