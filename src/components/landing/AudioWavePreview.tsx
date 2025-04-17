
import React from 'react';

const AudioWavePreview = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background pulse rings */}
      <div className="absolute w-full max-w-md aspect-square">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-gradient-to-br from-serenity-100 to-serenity-200 rounded-full animate-pulse-slow opacity-20"
            style={{
              animationDelay: `${i * 0.5}s`,
              transform: `scale(${1 - i * 0.15})`,
            }}
          />
        ))}
        
        {/* Audio wave bars */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1.5">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-serenity-400 to-serenity-600 rounded-full animate-wave"
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
