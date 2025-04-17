
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
    <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-border">
      <div className="flex flex-col items-center gap-4">
        {transcript && (
          <div className="w-full p-3 bg-white rounded-lg border border-input text-left">
            {transcript}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className={`rounded-full ${isRecording ? "" : "bg-serenity-500 hover:bg-serenity-600"}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isDisabled}
          >
            {isRecording ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          
          {transcript && (
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-serenity-500 hover:bg-serenity-600"
              onClick={sendVoice}
              disabled={isDisabled}
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {isRecording && (
          <div className="audio-wave mt-2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
