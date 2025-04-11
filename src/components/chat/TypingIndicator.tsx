
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
        <span className="text-serenity-600 text-sm font-semibold">S</span>
      </div>
      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-border">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
