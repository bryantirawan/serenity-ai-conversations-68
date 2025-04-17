
import React, { useRef, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/voice/VoiceRecorder';
import { useTherapist } from '@/context/TherapistContext';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  VolumeX, 
  Volume2, 
  Mic, 
  MicOff,
  MessageSquare, 
  MessageSquareOff,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceCallUI from '@/components/voice/VoiceCallUI';
import CloudBackground from '@/components/CloudBackground';

const VoicePage = () => {
  const { messages: therapistMessages, isProcessing, sendMessage, clearMessages } = useTherapist();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formattedMessages = therapistMessages.map(message => ({
    text: message.content,
    isUser: message.isUser
  }));

  useEffect(() => {
    scrollToBottom();
  }, [therapistMessages, isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceRecorded = (transcript: string) => {
    sendMessage(transcript);
  };

  const toggleMute = () => {
    setMuted(!muted);
    toast({
      title: muted ? "Microphone unmuted" : "Microphone muted",
      duration: 2000,
    });
  };

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
    toast({
      title: showTranscript ? "Transcript hidden" : "Transcript shown",
      duration: 2000,
    });
  };

  const startCall = () => {
    setInCall(true);
    setTimeout(() => {
      sendMessage("Hello, I'm here to listen whenever you're ready. Take your time and speak when you feel comfortable.");
    }, 2000); // Send initial message after countdown
  };

  const endCall = () => {
    toast({
      title: "Session finished",
      description: "Your session has been saved",
      duration: 3000,
    });
    setInCall(false);
  };

  const navigateToSchedule = () => {
    navigate('/schedule');
  };

  if (inCall) {
    return (
      <VoiceCallUI 
        messages={formattedMessages}
        isProcessing={isProcessing}
        onVoiceRecorded={handleVoiceRecorded}
        onEndCall={endCall}
        onToggleMute={toggleMute}
        onToggleTranscript={toggleTranscript}
        isMuted={muted}
        showTranscript={showTranscript}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <CloudBackground />
      <Header />
      
      <main className="flex-grow flex flex-col relative z-10">
        <div className="bg-white/50 backdrop-blur-sm py-8 px-4 md:px-8 border-b border-serenity-100">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-serenity-600 to-serenity-400 bg-clip-text text-transparent">
              Voice Therapy with Serenity
            </h1>
            <p className="text-center text-serenity-700 mt-2">
              Speak naturally and let your AI therapist listen to your thoughts and feelings.
            </p>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col">
            <div className="p-4 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={toggleMute}
              >
                {muted ? 
                  <><MicOff className="h-4 w-4 mr-2" /> Unmute</> : 
                  <><Mic className="h-4 w-4 mr-2" /> Mute</>
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
            
            <div className="flex-grow flex items-center justify-center px-4">
              <div className="text-center max-w-md">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Ready to start your voice session?</h2>
                <p className="text-serenity-700 mb-6">
                  Take a deep breath. Your AI therapist is ready to listen and provide support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={startCall}
                    size="lg"
                    className="rounded-full bg-serenity-500 hover:bg-serenity-600 px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    Start Voice Session
                  </Button>
                  
                  <Button
                    onClick={navigateToSchedule}
                    variant="outline"
                    size="lg"
                    className="rounded-full px-6 border-serenity-200 hover:bg-serenity-50"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule a Session
                  </Button>
                </div>
                <p className="mt-6 text-sm text-serenity-500 italic">
                  "You're doing great. Showing up matters."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoicePage;
