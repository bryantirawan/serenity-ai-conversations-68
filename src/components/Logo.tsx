
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-serenity-400 to-serenity-600 flex items-center justify-center shadow-md">
        <div className="absolute w-3 h-3 bg-white rounded-full top-1.5 left-1.5 opacity-70"></div>
        <span className="text-white font-bold">S</span>
      </div>
      <span className="font-bold text-xl text-foreground">Serenity</span>
    </div>
  );
};

export default Logo;
