import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
interface EncouragementMessage {
  message: string;
  type: 'observation' | 'suggestion';
}
const messages: EncouragementMessage[] = [{
  message: "You've been showing up more consistently. That's something to be proud of 💙",
  type: 'observation'
}, {
  message: "I noticed you tend to feel best after morning sessions. Would you like to schedule one tomorrow?",
  type: 'suggestion'
}];
const EncouragementFeed = () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return;
};
export default EncouragementFeed;