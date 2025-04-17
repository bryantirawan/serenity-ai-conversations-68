
import React from 'react';

interface CloudBackgroundProps {
  className?: string;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-skyhug-100 via-skyhug-50 to-white"></div>
      
      {/* Soft accent gradients */}
      <div className="absolute top-10 right-[10%] w-1/3 h-2/5 bg-gradient-to-br from-blush-100/30 to-transparent opacity-60 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-[10%] w-2/5 h-1/3 bg-gradient-to-tr from-lavender-100/40 to-transparent opacity-50 rounded-full blur-3xl"></div>
      
      {/* Enhanced decorative clouds */}
      <div className="cloud w-32 h-20 top-[10%] left-[5%] animate-drift-x" 
           style={{animationDelay: '0s', animationDuration: '25s'}}></div>
      <div className="cloud w-40 h-24 top-[15%] right-[10%] animate-drift-x" 
           style={{animationDelay: '2s', animationDuration: '32s'}}></div>
      <div className="cloud w-28 h-16 bottom-[30%] left-[15%] animate-drift-x" 
           style={{animationDelay: '4s', animationDuration: '28s'}}></div>
      <div className="cloud w-36 h-20 bottom-[20%] right-[20%] animate-drift-x" 
           style={{animationDelay: '6s', animationDuration: '35s'}}></div>
      <div className="cloud w-24 h-14 top-[50%] left-[50%] animate-drift-x" 
           style={{animationDelay: '8s', animationDuration: '30s'}}></div>
      
      {/* Additional soft clouds with vertical drift */}
      <div className="enhanced-cloud w-64 h-64 top-[30%] left-[20%] animate-drift-y" 
           style={{animationDelay: '0s', animationDuration: '20s'}}></div>
      <div className="enhanced-cloud w-80 h-80 bottom-[20%] right-[30%] animate-drift-y" 
           style={{animationDelay: '5s', animationDuration: '25s'}}></div>
    </div>
  );
};

export default CloudBackground;
