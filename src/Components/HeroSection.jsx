import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 via-transparent to-cyan-600/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

         
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
              Made for Bangladeshi Garments Factories
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
              Run Your Garments Factory
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                 Like a Pro</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
              The Garments Order & Production Tracker System is a modern, easy-to-use web platform built specifically for small and medium garment factories in Bangladesh. From buyer order to final shipment — track cutting, sewing, finishing, manage fabric & trims inventory, and deliver every order on time.
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              {["Real-time Tracking", "Zero Stock Error", "100% On-time Delivery", "Bangla + English"].map((feat) => (
                <div key={feat} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full text-sm font-medium">
                  <span className="text-amber-400">Checkmark</span> {feat}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="btn btn-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo"
                className="btn btn-lg btn-outline border-2 border-white/50 hover:bg-white hover:text-slate-900 font-bold text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                Watch Demo Video
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              No credit card required • 14-day free trial • Setup in 10 minutes
            </p>
          </div>

          {/* Right Side – Real-world Dashboard Preview */}
          <div className="relative perspective-1000">
            <div className="relative transform hover:rotate-3 hover:scale-105 transition-all duration-700">
              {/* Floating Dashboard Mockup */}
              <div className="relative bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-cyan-500 p-1">
                  <div className="bg-slate-900 px-8 py-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Live Dashboard</h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    {/* Mock content */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                          <p className="text-2xl font-bold text-amber-400">247</p>
                          <p className="text-sm text-gray-400">Active Orders</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                          <p className="text-2xl font-bold text-green-400">98%</p>
                          <p className="text-sm text-gray-400">On-time</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                          <p className="text-2xl font-bold text-cyan-400">৳42L</p>
                          <p className="text-sm text-gray-400">This Month</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-500/20 to-cyan-500/20 rounded-2xl p-6 text-center">
                        <p className="text-amber-300 font-semibold">Next Shipment in 3 Days → Style #BD-2025-001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-10 -right-5 bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl animate-bounce">
                ৫০+ ফ্যাক্টরি ব্যবহার করছে
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;