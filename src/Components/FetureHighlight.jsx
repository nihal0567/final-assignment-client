import React from 'react';

const FetureHighlight = () => {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
  {/* Background Glow */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>

  <div className="container mx-auto px-6 max-w-7xl relative z-10">
    {/* Section Title */}
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
        Powerful Features for{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400">
          Your Factory
        </span>
      </h2>
      <p className="mt-6 text-xl text-gray-400 font-medium">
        সবকিছু এক জায়গায় – সহজ, দ্রুত, নির্ভরযোগ্য
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { icon: "Dashboard", title: "Real-time Dashboard", desc: "সব অর্ডার, প্রোডাকশন ও স্টক এক নজরে দেখুন" },
        { icon: "Package", title: "Order Tracking", desc: "বায়ারের অর্ডার থেকে ডেলিভারি পর্যন্ত পুরো জার্নি ট্র্যাক করুন" },
        { icon: "Factory", title: "Production Stages", desc: "কাটিং → সেলাই → ফিনিশিং → প্যাকিং সব ধাপ মনিটর করুন" },
        { icon: "Box", title: "Smart Inventory", desc: "কাপড়, এক্সেসরিজ, থ্রেড – সবকিছুর হিসাব অটোমেটিক" },
        { icon: "Truck", title: "On-time Delivery", desc: "৯৮% ডেলিভারি অন-টাইম – বায়ারের ভরসা বাড়বে" },
        { icon: "Mobile", title: "Mobile Friendly", desc: "মোবাইলেও পুরো সিস্টেম চালান – যেকোনো জায়গা থেকে" }
      ].map((feature, i) => (
        <div
          key={i}
          className="group relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/10 
                     hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 
                     transition-all duration-500 transform hover:-translate-y-6"
        >
          {/* Icon Circle */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-cyan-500 
                          flex items-center justify-center text-4xl font-black text-black shadow-2xl 
                          group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center text-amber-300 mb-4 group-hover:text-amber-200 transition">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-center leading-relaxed text-base">
            {feature.desc}
          </p>

          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-amber-500/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </div>
      ))}
    </div>
  </div>
</section>
    );
};

export default FetureHighlight;