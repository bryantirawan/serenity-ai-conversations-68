
import React from 'react';
import { Cloud } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-skyhug-300 to-skyhug-600 flex items-center justify-center shadow-md">
        <div className="absolute w-3 h-3 bg-white rounded-full top-1.5 left-1.5 opacity-70"></div>
        <Cloud className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl text-foreground">Skyhug</span>
    </div>
  );
};

export default Logo;
