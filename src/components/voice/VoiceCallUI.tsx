
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '@/context/TherapistContext';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, MessageSquare, MessageSquareOff, PhoneOff } from 'lucide-react';
import ChatBubble from '@/components/chat/ChatBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import AudioWaveAnimation from '@/components/voice/AudioWaveAnimation';

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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countingDown, setCountingDown] = useState(true);
  const [countdown, setCountdown] = useState(3);

  // Countdown effect when starting call
  useEffect(() => {
    if (countingDown) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setCountingDown(false);
      }
    }
  }, [countdown, countingDown]);

  // Timer effect for call duration
  useEffect(() => {
    if (!countingDown) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countingDown]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Format the elapsed time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (countingDown) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-skyhug-50 via-sky-100 to-purple-50">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-skyhug-700">
            Starting session in...
          </h2>
          <div className="text-7xl font-bold text-skyhug-500 animate-pulse">
            {countdown === 0 ? "Let's begin" : countdown}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-skyhug-50 via-sky-100 to-purple-50 opacity-80 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#FDE1D3] to-transparent opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#E5DEFF] to-transparent opacity-20 rounded-full blur-3xl"></div>
      
      {/* Animated background element */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-32 bottom-0 left-0 opacity-20">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="#3385ff" 
              fillOpacity="0.5" 
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-[pulse_5s_ease-in-out_infinite]"
            ></path>
            <path 
              fill="#3385ff" 
              fillOpacity="0.3" 
              d="M0,256L48,224C96,192,192,128,288,122.7C384,117,480,171,576,176C672,181,768,139,864,144C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-[pulse_7s_ease-in-out_infinite]"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Top section - Header with title and timer */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-skyhug-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-skyhug-500 text-lg font-semibold">AI</span>
          </div>
          <h1 className="text-xl font-medium">In Session with Skyhug</h1>
        </div>
        <div className="px-4 py-1 rounded-full bg-white/80 border border-skyhug-100 text-skyhug-700 font-mono">
          {formatTime(elapsedTime)}
        </div>
      </header>

      {/* Middle section - AI visualization and transcription */}
      <main className="flex-grow flex flex-col relative z-10 px-4 py-6">
        <div className="mx-auto mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-skyhug-100 flex items-center justify-center z-10 relative">
              <span className="text-skyhug-500 text-3xl font-semibold">AI</span>
            </div>
            
            {/* Pulsing halo effect */}
            <div className={`absolute inset-0 rounded-full bg-skyhug-300 opacity-20 ${isProcessing ? 'animate-ping' : ''}`}></div>
            <div className={`absolute -inset-4 rounded-full bg-skyhug-200 opacity-10 ${isProcessing ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>

        {/* Audio wave animation when AI is speaking */}
        {isProcessing && (
          <div className="mb-6 flex justify-center">
            <AudioWaveAnimation />
          </div>
        )}
        
        {/* Transcription section */}
        {showTranscript && (
          <div className="flex-grow overflow-y-auto bg-white/50 rounded-xl backdrop-blur-sm p-4 max-h-[40vh] mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isProcessing && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
        
        {/* Voice recorder component (hidden but functional) */}
        <div className={showTranscript ? 'hidden' : 'flex-grow'}>
          <VoiceRecorder onVoiceRecorded={onVoiceRecorded} />
        </div>
      </main>
      
      {/* Bottom controls */}
      <footer className="relative z-10 px-6 py-6 flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-full h-12 w-12 p-0 bg-white/70"
          onClick={onToggleMute}
        >
          {isMuted ? <MicOff className="h-5 w-5 text-gray-700" /> : <Mic className="h-5 w-5 text-skyhug-500" />}
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full h-16 w-16 p-0 bg-red-500 hover:bg-red-600 border-4 border-white/50"
          onClick={onEndCall}
        >
          <PhoneOff className="h-7 w-7" />
        </Button>

        <Button
          variant="outline"
          className="rounded-full h-12 w-12 p-0 bg-white/70"
          onClick={onToggleTranscript}
        >
          {showTranscript ? 
            <MessageSquare className="h-5 w-5 text-skyhug-500" /> : 
            <MessageSquareOff className="h-5 w-5 text-gray-700" />}
        </Button>
      </footer>
    </div>
  );
};

export default VoiceCallUI;
