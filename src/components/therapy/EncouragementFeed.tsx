
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface EncouragementMessage {
  message: string;
  type: 'observation' | 'suggestion';
}

const messages: EncouragementMessage[] = [
  {
    message: "You've been showing up more consistently. That's something to be proud of 💙",
    type: 'observation'
  },
  {
    message: "I noticed you tend to feel best after morning sessions. Would you like to schedule one tomorrow?",
    type: 'suggestion'
  }
];

const EncouragementFeed = () => {
  return (
    <Card className="glass-panel mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5 text-skyhug-500" />
          Serenity Says
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                msg.type === 'observation' 
                  ? 'bg-skyhug-50/50 text-skyhug-700' 
                  : 'bg-serenity-50/50 text-serenity-700'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EncouragementFeed;
