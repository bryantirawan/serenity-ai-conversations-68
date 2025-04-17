
import React, { useState } from 'react';
import { useTherapist } from '@/context/TherapistContext';
import ChatBubble from '@/components/chat/ChatBubble';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const SessionRoom = () => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const { messages, sendMessage, isProcessing } = useTherapist();
  const [sessionTime, setSessionTime] = useState(0);

  const handleVoiceRecorded = (transcript: string) => {
    if (transcript.trim()) {
      sendMessage(transcript);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-sky-100 bg-white/50 backdrop-blur-sm p-4"
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-sky-700">
            Therapy Session
          </h1>
          <div className="flex items-center space-x-2 text-sky-600">
            <Timer className="h-4 w-4" />
            <span className="text-sm">
              {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-sky-100 bg-white/50 backdrop-blur-sm p-4">
        <div className="max-w-3xl mx-auto">
          <VoiceRecorder
            onVoiceRecorded={handleVoiceRecorded}
            isDisabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
