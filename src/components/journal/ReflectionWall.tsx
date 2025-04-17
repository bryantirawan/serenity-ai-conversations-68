
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, BookText, Sparkles } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

// Mock data - in a real app this would come from your database
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-04-17',
    content: 'Feeling more centered after today\'s session. The breathing exercises really helped.',
    mood: '😌'
  },
  {
    id: '2',
    date: '2024-04-16',
    content: 'Struggled with social anxiety at work, but used the grounding techniques we discussed.',
    mood: '😔'
  },
  {
    id: '3',
    date: '2024-04-15',
    content: 'Made progress in setting boundaries with family. It\'s challenging but necessary.',
    mood: '💪'
  },
  {
    id: '4',
    date: '2024-04-14',
    content: 'Celebrated small wins today. Taking it one step at a time.',
    mood: '🌟'
  },
  {
    id: '5',
    date: '2024-04-13',
    content: 'Feeling overwhelmed with social obligations, need to practice saying no.',
    mood: '😓'
  }
];

const ReflectionWall = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-cloud-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Private Reflection Wall</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="mb-4 p-4 bg-skyhug-50/50 rounded-lg border border-skyhug-100">
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-skyhug-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">AI Theme Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Most of your recent reflections relate to stress from social obligations and boundary setting. 
                  You're showing progress with coping strategies.
                </p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {mockEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-xl">{entry.mood}</span>
                  </div>
                  <p className="text-sm">{entry.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
};

export default ReflectionWall;
