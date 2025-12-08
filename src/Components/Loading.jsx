import React from 'react';

const Loading = () => {
    return (
         <div className="relative inline-flex items-center justify-center">
      <span
        className="absolute w-full h-full rounded-full border-2 border-[var(--c)] animate-spin 
                   shadow-[0_0_12px_var(--c)]"
      ></span>

      <span
        className="absolute w-[70%] h-[70%] rounded-full border-2 border-[var(--c)]
                   animate-spin-reverse shadow-[0_0_10px_var(--c)]"
        style={{ animationDuration: "1s" }}
      ></span>

      <span
        className="absolute w-[40%] h-[40%] rounded-full border-2 border-[var(--c)]
                   animate-spin shadow-[0_0_8px_var(--c)]"
        style={{ animationDuration: "0.8s" }}
      ></span>
    </div>
    );
};

export default Loading;