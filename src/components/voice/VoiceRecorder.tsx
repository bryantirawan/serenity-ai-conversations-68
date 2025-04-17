
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, SendHorizonal } from 'lucide-react';

type VoiceRecorderProps = {
  onVoiceRecorded: (transcript: string) => void;
  isDisabled?: boolean;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onVoiceRecorded, isDisabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (isDisabled) return;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Ensure previous instance is cleaned up
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
      
      // Browser compatibility
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript = event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      setRecognitionInstance(recognition);
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopRecording = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsRecording(false);
    }
  };

  const sendVoice = () => {
    if (transcript.trim()) {
      onVoiceRecorded(transcript);
      setTranscript('');
    }
  };

  return (
    <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-serenity-100">
      <div className="flex flex-col items-center gap-4">
        {transcript && (
          <div className="w-full p-3 bg-white/80 rounded-xl border border-serenity-100 text-left shadow-sm">
            {transcript}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className={`rounded-full shadow-md transition-all duration-300 hover:scale-105 ${
              isRecording 
                ? "bg-pink-500 hover:bg-pink-600" 
                : "bg-serenity-500 hover:bg-serenity-600"
            }`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isDisabled}
          >
            {isRecording ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
            {isRecording ? "Stop Recording" : "I'm Ready to Talk"}
          </Button>
          
          {transcript && (
            <Button
              type="button"
              size="icon"
              className="rounded-full shadow-md bg-serenity-500 hover:bg-serenity-600 transition-all duration-300 hover:scale-105"
              onClick={sendVoice}
              disabled={isDisabled}
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {isRecording && (
          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-serenity-400 animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
