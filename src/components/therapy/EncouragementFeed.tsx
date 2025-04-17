
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

  return (
    <Card className="mb-8 bg-white border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-skyhug-500" />
          Your Personal Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base">{randomMessage.message}</p>
      </CardContent>
    </Card>
  );
};

export default EncouragementFeed;
