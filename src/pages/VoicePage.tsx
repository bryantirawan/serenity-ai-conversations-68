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
      sendMessage("Hello, I'm here to talk whenever you're ready.");
    }, 4000); // Send initial message after countdown
  };

  const endCall = () => {
    toast({
      title: "Call ended",
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col">
        <div className="bg-serenity-50 py-6 px-4 md:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Voice Therapy with Skyhug</h1>
            <p className="text-center text-muted-foreground mt-2">
              Speak naturally and let your AI therapist listen to your thoughts and feelings.
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
            
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Ready to start your voice session?</h2>
                <p className="text-muted-foreground mb-6">
                  Your AI therapist is ready to listen and provide support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={startCall}
                    size="lg"
                    className="rounded-full bg-skyhug-500 hover:bg-skyhug-600 px-8 py-6 text-lg animate-pulse-slow"
                  >
                    Start Voice Session
                  </Button>
                  
                  <Button
                    onClick={navigateToSchedule}
                    variant="outline"
                    size="lg"
                    className="rounded-full px-6"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule a Session
                  </Button>
                </div>
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
