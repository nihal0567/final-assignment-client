import React from 'react';
import { Link } from 'react-router';

const CtaSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  <div className="container mx-auto px-6 max-w-7xl text-center">
    {/* Main CTA */}
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
        Ready to Grow Your Factory <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Smarter?</span>
      </h2>
      <p className="text-xl text-gray-400 mb-10">
        ১৪ দিনের ফ্রি ট্রায়াল – কোনো কার্ড লাগবে না। আজই শুরু করো!
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <Link
          to="/register"
          className="btn btn-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl px-12 shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Start Free Trial
        </Link>
        <Link
          to="/contact"
          className="btn btn-lg btn-outline border-2 border-white/50 hover:bg-white hover:text-slate-900 font-bold text-xl px-12 backdrop-blur-sm"
        >
          Book a Demo Call
        </Link>
      </div>
    </div>

    {/* Trust Badges */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-80">
      {[
        { text: "50+ Factories", sub: "Already Using" },
        { text: "98% On-time", sub: "Delivery Rate" },
        { text: "24/7 Support", sub: "Bangla + English" },
        { text: "Made in BD", sub: "For Bangladeshi RMG" }
      ].map((badge, i) => (
        <div key={i} className="text-center">
          <p className="text-4xl font-black text-amber-400">{badge.text}</p>
          <p className="text-sm text-gray-500 mt-2">{badge.sub}</p>
        </div>
      ))}
    </div>

    {/* Final Note */}
    <p className="mt-16 text-gray-500 text-sm">
      No credit card • Instant setup • Cancel anytime
    </p>
  </div>
</section>
    );
};

export default CtaSection;