import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface TherapistContextType {
  messages: Message[];
  isProcessing: boolean;
  sendMessage: (message: string) => void;
  sendAudioMessage: (blob: Blob) => void;
  clearMessages: () => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const TherapistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, patientReady } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatMessage = (msg: any): Message => ({
    id: msg.id,
    content: msg.transcription || '[No content]',
    isUser: msg.sender_role === 'user',
    timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const createConversation = async () => {
    console.log("👤 user:", user);
    console.log("🧠 patientReady:", patientReady);

    if (!user || !patientReady) {
      console.warn("⏳ Waiting for patient to be ready...");
      return;
    }

    console.log("🟡 Creating new conversation...");

    const { data, error, status } = await supabase
      .from('conversations')
      .insert({ patient_id: user.id, title: 'Therapy Session' })
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error inserting conversation:", error);
      return;
    }

    if (!data) {
      console.error("❌ No conversation returned and no error");
      return;
    }

    console.log("✅ New conversation ID:", data.id);
    setConversationId(data.id);
    setMessages([]); // Clear previous messages on new session
  };

  const clearMessages = createConversation;

  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;
    console.log("📤 Sending message to Supabase...");

    setIsProcessing(true);

    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_role: 'user',
      transcription: content,
      transcription_status: 'done',
      ai_status: 'pending',
      tts_status: 'pending'
    });

    if (error) console.error('Error sending message:', error);
    setIsProcessing(false);
  };

  const sendAudioMessage = async (blob: Blob) => {
    if (!conversationId || !user) return;
    setIsProcessing(true);

    const key = `${user.id}/${uuidv4()}.webm`;
    const { error: uploadError } = await supabase.storage
      .from('raw-audio')
      .upload(key, blob, { contentType: 'audio/webm' });

    if (uploadError) {
      console.error('Error uploading audio:', uploadError);
      setIsProcessing(false);
      return;
    }

    const { error: insertError } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_role: 'user',
      audio_path: key,
      transcription_status: 'pending',
      ai_status: 'pending',
      tts_status: 'pending'
    });

    if (insertError) console.error('Error inserting audio message:', insertError);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel('messages-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new;
          console.log("📥 New message received:", newMessage);
          setMessages((prev) => [...prev, formatMessage(newMessage)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return (
    <TherapistContext.Provider
      value={{
        messages,
        isProcessing,
        sendMessage,
        sendAudioMessage,
        clearMessages
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};

export const useTherapist = (): TherapistContextType => {
  const context = useContext(TherapistContext);
  if (context === undefined) {
    throw new Error('useTherapist must be used within a TherapistProvider');
  }
  return context;
};