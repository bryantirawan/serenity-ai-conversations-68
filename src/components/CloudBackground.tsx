
import React from 'react';

interface CloudBackgroundProps {
  className?: string;
}

const CloudBackground: React.FC<CloudBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Main background gradient - soft lavender to white */}
      <div className="absolute inset-0 bg-gradient-to-br from-serenity-100 via-serenity-50 to-white"></div>
      
      {/* Soft accent gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#FDE1D3] to-transparent opacity-40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#E5DEFF] to-transparent opacity-30 rounded-full blur-3xl"></div>
      
      {/* Light particles floating */}
      <div className="particles-container absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-60 animate-float"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
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
