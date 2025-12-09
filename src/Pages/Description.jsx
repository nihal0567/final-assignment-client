import React from 'react';
import { Link } from 'react-router';

const Description = () => {
    return (
        <section className="py-20 bg-slate-900">
  <div className="container mx-auto px-6 max-w-7xl">

    {/* Section Title */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">GOTRACK</span> Works
      </h2>
      <p className="text-xl text-gray-400">৩টা সহজ ধাপে তোমার কারখানা ডিজিটাল হয়ে যাবে</p>
    </div>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Step 1 */}
      <div className="group relative text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-3xl group-hover:blur-xl transition"></div>
        
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-amber-500/50 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-4xl font-black text-black shadow-xl">
            ১
          </div>
          <h3 className="text-2xl font-bold text-amber-300 mb-4">Register & Setup</h3>
          <p className="text-gray-300 leading-relaxed">
            ফ্রি রেজিস্ট্রেশন করো। কারখানার নাম, লোকেশন, মেশিন সংখ্যা দিয়ে প্রোফাইল সেটআপ করো। মাত্র ৫ মিনিট!
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="group relative text-center mt-8 md:mt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-3xl blur-3xl group-hover:blur-xl transition"></div>
        
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-cyan-500/50 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-4xl font-black text-black shadow-xl">
            ২
          </div>
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">Add Orders & Track Live</h3>
          <p className="text-gray-300 leading-relaxed">
            বায়ারের অর্ডার যোগ করো। কাটিং → সেলাই → ফিনিশিং → প্যাকিং সব ধাপ লাইভ দেখো। কে কাজ করছে, কতটুকু হয়েছে – সব রিয়েল-টাইম।
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="group relative text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-3xl blur-3xl group-hover:blur-xl transition"></div>
        
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-4xl font-black text-white shadow-xl">
            ৩
          </div>
          <h3 className="text-2xl font-bold text-purple-300 mb-4">Deliver On Time & Grow</h3>
          <p className="text-gray-300 leading-relaxed">
            ডেলিভারি মিস হবে না। বায়ার খুশি, রিপিট অর্ডার আসবে। রিপোর্ট দেখে কোথায় দেরি হচ্ছে তা ঠিক করো। কারখানা আরো লাভজনক হবে।
          </p>
        </div>
      </div>

    </div>

    {/* CTA Bottom */}
    <div className="text-center mt-16">
      <Link
        to="/register"
        className="inline-flex items-center gap-3 btn btn-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
      >
        Start Free – No Credit Card Needed
      </Link>
      <p className="mt-4 text-gray-400">১৪ দিনের ফ্রি ট্রায়াল • কোনো ঝামেলা নেই</p>
    </div>

  </div>
</section>
    );
};

export default Description;