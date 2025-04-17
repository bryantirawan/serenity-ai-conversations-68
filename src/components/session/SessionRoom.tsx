import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTherapist } from '@/context/TherapistContext';
import ChatBubble from '@/components/chat/ChatBubble';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import ChatInput from '@/components/chat/ChatInput';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, Timer, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const SessionRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const { messages, sendMessage, isProcessing, clearMessages } = useTherapist();
  const [sessionTime, setSessionTime] = useState(0);

  const handleVoiceRecorded = (transcript: string) => {
    if (transcript.trim()) {
      sendMessage(transcript);
    }
  };

  const handleEndSession = () => {
    toast({
      title: "Session ended",
      description: "Thank you for sharing today. Take care!",
      duration: 3000,
    });
    clearMessages();
    navigate('/home');
  };

  const handleToggleMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-sky-100 bg-white/50 backdrop-blur-sm p-4"
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-sky-700">
              Therapy Session
            </h1>
            <div className="flex items-center gap-2">
              <Label htmlFor="voice-toggle" className="text-sky-600 text-sm">
                {isVoiceMode ? "Voice Mode" : "Chat Mode"}
              </Label>
              <Switch
                id="voice-toggle"
                checked={isVoiceMode}
                onCheckedChange={handleToggleMode}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 text-sky-600">
              <Timer className="h-4 w-4" />
              <span className="text-sm">
                {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleEndSession}
            >
              <XCircle className="h-5 w-5 mr-2" />
              End Session
            </Button>
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

      <div className="border-t border-sky-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          {isVoiceMode ? (
            <VoiceRecorder
              onVoiceRecorded={handleVoiceRecorded}
              isDisabled={isProcessing}
            />
          ) : (
            <ChatInput
              onSendMessage={sendMessage}
              isVoiceEnabled={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
