
import React from 'react';

const AudioWavePreview = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full max-w-md">
        {/* Main cloud background */}
        <div className="absolute w-[120%] h-[120%] bg-white rounded-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
        
        {/* Cloud bumps */}
        <div className="absolute w-[40%] h-[40%] bg-white rounded-full -top-[5%] left-[20%] shadow-sm"></div>
        <div className="absolute w-[45%] h-[45%] bg-white rounded-full -top-[10%] right-[25%] shadow-sm"></div>
        <div className="absolute w-[30%] h-[30%] bg-white rounded-full -top-[2%] right-[10%] shadow-sm"></div>
        
        {/* Soft glow effect */}
        <div className="absolute w-[140%] h-[140%] bg-serenity-50/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-xl -z-10"></div>
        <div className="absolute w-[160%] h-[160%] bg-serenity-100/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl -z-20"></div>
        
        {/* Wave animation */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-serenity-500 rounded-full animate-wave"
                style={{
                  height: '40px',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioWavePreview;
