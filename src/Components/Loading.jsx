import React from 'react';

const Loading = () => {
    return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-amber-400 font-semibold text-lg animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;