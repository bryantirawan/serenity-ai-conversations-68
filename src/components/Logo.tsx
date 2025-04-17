
import React from 'react';
import { Cloud, Sparkle } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        {/* Main cloud container with hug-like curves */}
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-skyhug-300 to-skyhug-600 flex items-center justify-center shadow-md before:content-[''] before:absolute before:w-9 before:h-7 before:border-t-[3px] before:border-skyhug-300/30 before:rounded-t-full before:-left-0.5 before:-top-1 after:content-[''] after:absolute after:w-9 after:h-7 after:border-t-[3px] after:border-skyhug-300/30 after:rounded-t-full after:-right-0.5 after:-top-1">
          {/* Highlight effect */}
          <div className="absolute w-3 h-3 bg-white rounded-full top-1.5 left-1.5 opacity-70"></div>
          
          {/* Cloud icon */}
          <Cloud className="h-5 w-5 text-white relative z-10" />
          
          {/* Sparkle animation */}
          <div className="absolute top-1 right-1 transition-opacity animate-pulse-slow">
            <Sparkle className="h-3 w-3 text-white opacity-80" />
          </div>
        </div>
      </div>
      
      {/* Updated typography */}
      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xl text-foreground tracking-tight group-hover:text-skyhug-500 transition-colors">
        skyhug
      </span>
    </div>
  );
};

export default Logo;
