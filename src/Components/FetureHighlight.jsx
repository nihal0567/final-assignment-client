import React from 'react';

const FetureHighlight = () => {
    return (
        <section className="py-20 bg-slate-900/50">
  <div className="container mx-auto px-6 max-w-7xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
        Powerful Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Your Factory</span>
      </h2>
      <p className="text-xl text-gray-400">সবকিছু এক জায়গায় – সহজ, দ্রুত, নির্ভরযোগ্য</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { icon: "Chart", title: "Real-time Dashboard", desc: "সব অর্ডার, প্রোডাকশন ও স্টক এক নজরে দেখুন" },
        { icon: "Package", title: "Order Tracking", desc: "বায়ারের অর্ডার থেকে ডেলিভারি পর্যন্ত পুরো জার্নি ট্র্যাক করুন" },
        { icon: "Factory", title: "Production Stages", desc: "কাটিং → সেলাই → ফিনিশিং → প্যাকিং সব ধাপ মনিটর করুন" },
        { icon: "Box", title: "Smart Inventory", desc: "কাপড়, এক্সেসরিজ, থ্রেড – সবকিছুর হিসাব অটোমেটিক" },
        { icon: "Truck", title: "On-time Delivery", desc: "৯৮% ডেলিভারি অন-টাইম – বায়ারের ভরসা বাড়বে" },
        { icon: "Mobile", title: "Mobile Friendly", desc: "মোবাইলেও পুরো সিস্টেম চালান – যেকোনো জায়গা থেকে" }
      ].map((feature, i) => (
        <div
          key={i}
          className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-cyan-500 flex items-center justify-center text-3xl shadow-xl">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold text-amber-300 text-center mb-3">{feature.title}</h3>
          <p className="text-gray-400 text-center leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    );
};

export default FetureHighlight;