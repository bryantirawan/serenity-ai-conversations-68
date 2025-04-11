
import React, { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/chat/ChatBubble';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { useTherapist } from '@/context/TherapistContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, VolumeX, Volume2 } from 'lucide-react';
import { useState } from 'react';

const VoicePage = () => {
  const { messages, isProcessing, sendMessage, clearMessages } = useTherapist();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceRecorded = (transcript: string) => {
    sendMessage(transcript);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col">
        <div className="bg-serenity-50 py-6 px-4 md:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Voice Therapy with Serenity</h1>
            <p className="text-center text-muted-foreground mt-2">
              Speak naturally and let Serenity listen to your thoughts and feelings.
            </p>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col bg-gradient-to-b from-white to-serenity-50">
          <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col">
            <div className="p-4 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={toggleMute}
              >
                {muted ? 
                  <><VolumeX className="h-4 w-4 mr-2" /> Unmute</> : 
                  <><Volume2 className="h-4 w-4 mr-2" /> Mute</>
                }
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground"
                onClick={clearMessages}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start New Chat
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-4 md:px-8 py-4">
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                {isProcessing && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <VoiceRecorder onVoiceRecorded={handleVoiceRecorded} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoicePage;
