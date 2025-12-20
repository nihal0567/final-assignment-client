import React from 'react';

const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-900/80 backdrop-blur-xl border border-red-600/50 shadow-2xl shadow-red-900/40 rounded-3xl overflow-hidden relative">
        
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 animate-pulse pointer-events-none"></div>
        
        <div className="card-body text-center p-8 md:p-12 relative z-10">
          {/* Forbidden Symbol */}
          <div className="relative mx-auto mb-6">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-8 border-red-600 flex items-center justify-center relative">
              <div className="w-4/5 h-1.5 bg-red-600 rounded-full rotate-45 absolute"></div>
              <div className="w-4/5 h-1.5 bg-red-600 rounded-full -rotate-45 absolute"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-red-600/30 blur-2xl animate-pulse"></div>
            </div>

            {/* Skull */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl text-red-500 animate-pulse">
              ☠
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-red-500 tracking-wider mb-4">
            ACCESS DENIED
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            403 Forbidden <br />
            <span className="text-red-400 font-semibold">You shall not pass!</span>
          </p>

          {/* Alert */}
          <div className="alert alert-error shadow-lg mb-8 border-red-600/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">
              This area is restricted. Intrusion will be logged and prosecuted.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-outline btn-error btn-lg w-full sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>

            <button className="btn btn-error btn-lg w-full sm:w-auto">
              Contact Admin
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-10">
            System secured by <span className="text-red-600">xAI</span> • Intrusion detected: 127.0.0.1
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenAccess;