
import React from 'react';

interface CloudBackgroundProps {
  className?: string;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-blue-sky"></div>
      
      {/* Decorative clouds */}
      <div className="cloud w-32 h-20 top-[10%] left-[5%] animate-float-cloud" 
           style={{animationDelay: '0s'}}></div>
      <div className="cloud w-40 h-24 top-[15%] right-[10%] animate-float-cloud" 
           style={{animationDelay: '1.5s'}}></div>
      <div className="cloud w-28 h-16 bottom-[30%] left-[15%] animate-float-cloud" 
           style={{animationDelay: '3s'}}></div>
      <div className="cloud w-36 h-20 bottom-[20%] right-[20%] animate-float-cloud" 
           style={{animationDelay: '4.5s'}}></div>
      <div className="cloud w-24 h-14 top-[50%] left-[50%] animate-float-cloud" 
           style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default CloudBackground;
