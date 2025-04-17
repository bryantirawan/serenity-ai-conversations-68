
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, SendHorizonal, Volume2, VolumeX, MessageSquare, MessageSquareOff, Calendar } from 'lucide-react';
import ChatBubble from '@/components/chat/ChatBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { useTherapist } from '@/context/TherapistContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '@/components/voice/VoiceRecorder';

interface VoiceCallUIProps {
  messages: { text: string; isUser: boolean }[];
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
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleSession = () => {
    onEndCall();
    navigate('/schedule');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-serenity-50 py-6 px-4 md:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Voice Therapy Session</h1>
          <p className="text-center text-muted-foreground mt-2">
            Engage in a voice therapy session with your AI therapist.
          </p>
        </div>
      </div>

      <main className="flex-grow flex flex-col bg-gradient-to-b from-white to-serenity-50">
        <div className="max-w-3xl mx-auto flex-grow flex flex-col p-4">
          <div className="space-y-4 flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <ChatBubble key={index} content={message.text} isUser={message.isUser} />
            ))}
            {isProcessing && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <VoiceRecorder onVoiceRecorded={onVoiceRecorded} isDisabled={isProcessing} />
        </div>
      </main>

      <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onToggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onToggleTranscript}
            >
              {showTranscript ? <MessageSquare className="h-5 w-5" /> : <MessageSquareOff className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleScheduleSession}
              variant="outline"
              className="rounded-full"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={onEndCall}
            >
              End Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallUI;
