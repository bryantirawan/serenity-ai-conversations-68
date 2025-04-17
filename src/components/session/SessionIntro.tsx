
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SessionIntroProps {
  onStartSession: () => void;
}

const SessionIntro: React.FC<SessionIntroProps> = ({ onStartSession }) => {
  const [countdown, setCountdown] = useState(3);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (isStarting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isStarting && countdown === 0) {
      onStartSession();
    }
  }, [countdown, isStarting]);

  const handleSkip = () => {
    setIsStarting(false);
    onStartSession();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-[#f8faff]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 to-purple-50/40 animate-pulse-slow" />
        
        {/* Content container */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.h1 
              className="text-2xl font-semibold text-[#425DFF] font-plus-jakarta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Getting your therapist ready
            </motion.h1>
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-6 w-6 text-[#425DFF]" />
            </motion.div>
          </div>

          <p className="text-blue-600/80 text-center mb-8 font-plus-jakarta">
            Take a breath. We're here when you're ready.
          </p>
          
          {isStarting ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-[#425DFF] mb-4 font-plus-jakarta">
                {countdown}
              </div>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i >= countdown ? 'bg-blue-200' : 'bg-[#425DFF]'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: i === countdown - 1 ? [0.8, 1.2, 0.8] : 0.8 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-[#425DFF] hover:text-blue-700 font-plus-jakarta"
              >
                Skip countdown
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="mic-toggle" className="text-blue-700 font-plus-jakarta">
                    Microphone
                  </Label>
                  <Switch
                    id="mic-toggle"
                    checked={isMicEnabled}
                    onCheckedChange={setIsMicEnabled}
                    className="bg-gradient-to-r from-blue-300 to-purple-300"
                  />
                </div>
                
                <p className="text-center text-sm text-blue-600/80 font-plus-jakarta">
                  You can talk or type — whichever feels better today.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsStarting(true)}
                    className="w-full bg-gradient-to-r from-[#7F9CF5] to-[#A78BFA] hover:opacity-90 text-white rounded-full shadow-lg transition-all duration-300 font-plus-jakarta"
                  >
                    {isMicEnabled ? (
                      <Mic className="h-4 w-4 mr-2" />
                    ) : (
                      <MicOff className="h-4 w-4 mr-2" />
                    )}
                    Begin Session with Sky
                  </Button>
                  
                  <motion.p 
                    className="text-center text-sm text-blue-600/70 italic font-plus-jakarta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ✨ Your mind deserves this pause.
                  </motion.p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SessionIntro;
