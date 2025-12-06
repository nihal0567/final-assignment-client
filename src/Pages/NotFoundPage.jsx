import React, { useState, useEffect } from 'react';

export default function NotFoundWithLoader() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (remove this in real app or trigger when needed)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ParachuteLoader />;
  }

  return <NotFoundPage />;
}

// Parachute Loader Component
function ParachuteLoader() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-80 h-80 overflow-hidden bg-gray-900 rounded-xl font-sans">
        {/* Wind Lines */}
        {[20, 80, 10, 90, 50].map((left, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-white/60 rounded-full bottom-[-60px] opacity-0 animate-wind-up"
            style={{
              left: `${left}%`,
              height: `${[40, 60, 30, 50, 25][i]}px`,
              animationDelay: `${[0, 0.2, 0.4, 0.1, 0.5][i]}s`,
              animationDuration: `${[0.5, 0.7, 0.6, 0.8, 0.4][i]}s`,
            }}
          />
        ))}

        {/* Clouds */}
        <div className="absolute bottom-[-100px] left-[10%] w-16 h-16 bg-white rounded-full opacity-80 animate-cloud-up">
          <div className="absolute -top-5 left-2 w-10 h-10 bg-white rounded-full" />
          <div className="absolute -top-2.5 left-8 w-12 h-12 bg-white rounded-full" />
        </div>
        <div className="absolute bottom-[-100px] right-[15%] w-20 h-20 bg-white rounded-full opacity-60 animate-cloud-up-delayed">
          <div className="absolute -top-6 left-4 w-12 h-12 bg-white rounded-full" />
          <div className="absolute -top-4 left-10 w-14 h-14 bg-white rounded-full" />
        </div>

        {/* Parachutist */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-36 animate-sway z-10">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
            <line x1="10" y1="40" x2="45" y2="80" stroke="#eee" strokeWidth="2" />
            <line x1="90" y1="40" x2="55" y2="80" stroke="#eee" strokeWidth="2" />
            <line x1="50" y1="35" x2="50" y2="80" stroke="#eee" strokeWidth="2" />
            <path d="M 10 40 Q 50 -10 90 40 Z" fill="#FF6B6B" />
            <path d="M 30 28 Q 50 0 70 28 L 50 35 Z" fill="#FFFFFF" opacity="0.3" />
            <circle cx="50" cy="85" r="8" fill="#FFFFFF" />
            <rect x="42" y="93" width="16" height="20" rx="5" fill="#1E90FF" />
            <path d="M 42 95 L 30 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 95 L 70 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 45 113 L 40 120" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 55 113 L 60 120" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute bottom-6 w-full text-center text-white font-bold text-sm uppercase tracking-widest animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}

// 404 Page (same style as your screenshot)
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-bold text-[#635fc7] mb-8 tracking-tighter">404</h1>
      <p className="text-gray-600 mb-10 text-lg text-center">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-8 py-3 bg-white border border-[#635fc7] text-[#635fc7] font-medium rounded-full 
        hover:bg-[#635fc7] hover:text-white transition-all shadow-md"
      >
        Home
      </a>

      {/* All custom animations injected once */}
      <style jsx>{`
        @layer components {
          @keyframes sway {
            0%, 100% { transform: translate(-50%, -50%) rotate(-5deg); }
            50% { transform: translate(-50%, -45%) rotate(5deg); }
          }
          @keyframes cloud-up {
            0% { bottom: -100px; opacity: 0; }
            20%, 80% { opacity: 0.9; }
            100% { bottom: 350px; opacity: 0; }
          }
          @keyframes wind-up {
            0% { bottom: -60px; opacity: 0; }
            50% { opacity: 1; }
            100% { bottom: 350px; opacity: 0; }
          }
          .animate-sway { animation: sway 3s ease-in-out infinite; }
          .animate-cloud-up { animation: cloud-up 3s linear infinite; }
          .animate-cloud-up-delayed { animation: cloud-up 3.2s linear 1s infinite; }
          .animate-wind-up { animation: wind-up 0.8s linear infinite; }
        }
      `}</style>
    </div>
  );
}