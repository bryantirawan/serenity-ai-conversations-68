
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
  return (
    <Card className="mb-6 bg-white/80 border-serenity-100 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-serenity-500" />
          Personalized Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className={`w-2 h-2 mt-2 rounded-full ${msg.type === 'observation' ? 'bg-serenity-400' : 'bg-amber-400'}`} />
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EncouragementFeed;
