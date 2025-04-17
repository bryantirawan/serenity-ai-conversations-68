
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
    <Card className="bg-white border-border shadow-sm mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-sky-500" /> {/* Changed from serenity-500 */}
          Sky Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-2">
          <div className="text-base">
            {randomMessage.message}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Based on {randomMessage.type === 'observation' ? 'analysis of your patterns' : 'suggestions for improvement'}
        </div>
      </CardContent>
    </Card>
  );
};

export default EncouragementFeed;

