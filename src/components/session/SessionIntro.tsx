
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-sky-100"
      >
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-3">
          Getting your therapist ready...
        </h1>
        <p className="text-sky-700 text-center mb-8">
          Take a breath. We're here when you're ready.
        </p>
        
        {isStarting ? (
          <div className="text-center">
            <div className="text-4xl font-bold text-sky-500 mb-4">
              {countdown}
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i >= countdown ? 'bg-sky-200' : 'bg-sky-500'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-sky-600 hover:text-sky-700"
            >
              Skip countdown
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-4">
                <Label htmlFor="mic-toggle" className="text-sky-700">
                  Microphone
                </Label>
                <Switch
                  id="mic-toggle"
                  checked={isMicEnabled}
                  onCheckedChange={setIsMicEnabled}
                />
              </div>
              
              <p className="text-center text-sm text-sky-600">
                You can talk or type — whichever feels better today.
              </p>
              
              <Button 
                onClick={() => setIsStarting(true)}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white"
              >
                {isMicEnabled ? (
                  <Mic className="h-4 w-4 mr-2" />
                ) : (
                  <MicOff className="h-4 w-4 mr-2" />
                )}
                Begin Session
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SessionIntro;
