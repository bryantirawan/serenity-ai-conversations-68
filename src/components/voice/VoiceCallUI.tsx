
import React, { useRef, useEffect, useState } from 'react';
import { Message } from '@/context/TherapistContext';
import ChatBubble from '@/components/chat/ChatBubble';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import TypingIndicator from '@/components/chat/TypingIndicator';
import SessionSummary from '@/components/session/SessionSummary';
import AudioWaveAnimation from '@/components/voice/AudioWaveAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  MessageSquareOff,
  X
} from 'lucide-react';

interface VoiceCallUIProps {
  messages: Message[];
  isProcessing: boolean;
  onVoiceRecorded: (transcript: string) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleTranscript: () => void;
  isMuted: boolean;
  showTranscript: boolean;
}

const VoiceCallUI: React.FC<VoiceCallUIProps> = ({
  messages,
  isProcessing,
  onVoiceRecorded,
  onEndCall,
  onToggleMute,
  onToggleTranscript,
  isMuted,
  showTranscript
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(3);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  useEffect(() => {
    // Start countdown
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !sessionStarted) {
      setSessionStarted(true);
    }
  }, [countdown, sessionStarted]);

  useEffect(() => {
    if (sessionStarted && !sessionEnded) {
      const timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionStarted, sessionEnded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setSessionEnded(true);
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    onEndCall();
  };

  if (showSummary) {
    return <SessionSummary onClose={handleCloseSummary} />;
  }

  if (countdown > 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-skyhug-50 to-sky-50">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-skyhug-600 mb-2">Starting session in</h2>
            <div className="w-32 h-32 rounded-full bg-skyhug-500 flex items-center justify-center text-white text-6xl font-bold mx-auto animate-pulse-slow">
              {countdown}
            </div>
            <p className="mt-4 text-muted-foreground">Get ready to speak with your AI therapist</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-skyhug-50 to-sky-50 relative">
      {/* Top header */}
      <div className="py-4 px-6 flex justify-between items-center border-b border-skyhug-100">
        <div>
          <h1 className="text-xl font-semibold">In Session with Serenity</h1>
          <p className="text-sm text-muted-foreground">AI Therapist</p>
        </div>
        <div className="text-lg font-mono bg-white px-3 py-1 rounded-md shadow-sm">
          {formatTime(sessionTime)}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow flex flex-col p-4 md:p-6 relative">
        {/* Center visualization */}
        <div className="flex-grow flex flex-col items-center justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md flex items-center justify-center">
              <AudioWaveAnimation />
            </div>
            <div className="absolute inset-0 rounded-full bg-skyhug-500 opacity-10 animate-pulse-slow"></div>
          </div>
          {isProcessing && (
            <div className="mt-6 text-center">
              <TypingIndicator />
              <p className="text-sm text-muted-foreground mt-2">Serenity is thinking...</p>
            </div>
          )}
        </div>
        
        {/* Transcript area */}
        {showTranscript && (
          <div className="h-40 md:h-48 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-skyhug-100 p-2 mb-4">
            <ScrollArea className="h-full">
              <div className="space-y-3 p-2">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
      
      {/* Bottom controls */}
      <div className="p-6 flex justify-between items-center">
        <button
          onClick={onToggleMute}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <button
          onClick={handleEndCall}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 shadow-md"
        >
          <X size={24} className="text-white" />
        </button>
        
        <button
          onClick={onToggleTranscript}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md"
        >
          {showTranscript ? <MessageSquareOff size={20} /> : <MessageSquare size={20} />}
        </button>
      </div>
      
      {/* Voice recorder component - hidden but functional */}
      <div className="hidden">
        <VoiceRecorder onTranscript={onVoiceRecorded} isDisabled={isMuted} />
      </div>
    </div>
  );
};

export default VoiceCallUI;
