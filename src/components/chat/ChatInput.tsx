
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Send } from 'lucide-react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  onStartVoice?: () => void;
  isVoiceEnabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onStartVoice, 
  isVoiceEnabled = false 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-4 bg-white/50 backdrop-blur-sm">
      <div className="relative flex-grow">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 pr-10 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-serenity-300 transition-all"
        />
      </div>
      
      {isVoiceEnabled && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={onStartVoice}
        >
          <Mic className="h-5 w-5 text-serenity-500" />
        </Button>
      )}
      
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-serenity-500 hover:bg-serenity-600"
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
