
import React from 'react';

const AudioWavePreview = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full max-w-md">
        {/* Cloud-like background layers */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute cloud bg-serenity-50/50 rounded-full"
            style={{
              width: `${100 - i * 15}%`,
              height: `${100 - i * 15}%`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${1 - i * 0.1})`,
              filter: 'blur(10px)',
              zIndex: -i
            }}
          />
        ))}
        
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
