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
    content: msg.transcription ?? msg.assistant_text ?? '[No content]',
    isUser: msg.sender_role === 'user',
    timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  // Load full history for a conversation
  const loadHistory = async (convId: string) => {
    const { data: rows, error } = await supabase
      .from('messages')
      .select('id, sender_role, transcription, assistant_text, created_at')
      .eq('conversation_id', convId)
      .order('created_at');
    if (error) {
      console.error('Error loading conversation history:', error);
      return;
    }
    setMessages(rows.map(formatMessage));
  };

  // Create or restart a conversation
  const createConversation = async () => {
    if (!user || !patientReady) {
      console.warn('⏳ Waiting for patient to be ready...');
      return;
    }
    console.log('🟡 Creating new conversation...');
    const { data, error } = await supabase
      .from('conversations')
      .insert({ patient_id: user.id, title: 'Therapy Session' })
      .select()
      .single();
    if (error || !data) {
      console.error('❌ Supabase error creating conversation:', error);
      return;
    }
    console.log('✅ New conversation ID:', data.id);
    setConversationId(data.id);
    setMessages([]);
    // Load initial history (e.g., welcome message)
    await loadHistory(data.id);
  };

  const clearMessages = createConversation;

  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;
    console.log('📤 Sending message to Supabase...');
    setIsProcessing(true);
    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_role: 'user',
        transcription: content,
        transcription_status: 'done',
        ai_status: 'pending',
        tts_status: 'pending'
      });
    if (error) console.error('Error sending message:', error);
    // reload history so UI shows your message immediately
    await loadHistory(conversationId);
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
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_role: 'user',
        audio_path: key,
        transcription_status: 'pending',
        ai_status: 'pending',
        tts_status: 'pending'
      });
    if (insertError) console.error('Error inserting audio message:', insertError);
    await loadHistory(conversationId!);
    setIsProcessing(false);
  };

  // Subscribe to new assistant messages in real-time
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`messages-updates-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const msg = payload.new;
          // only show assistant messages here (user reload handled above)
          if (msg.sender_role === 'assistant') {
            setMessages((prev) => [...prev, formatMessage(msg)]);
          }
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
  if (!context) {
    throw new Error('useTherapist must be used within a TherapistProvider');
  }
  return context;
};