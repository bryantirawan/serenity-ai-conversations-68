
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Award, Mic, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Milestone {
  id: string;
  title: string;
  icon: React.ReactNode;
  date: string;
  description: string;
  moodLog?: string;
  journalEntry?: string;
}

const milestones: Milestone[] = [{
  id: '1',
  title: '3 Days in a Row',
  icon: <Check className="h-5 w-5 text-green-500" />,
  date: '2024-04-15',
  description: 'Completed sessions three days consecutively',
  moodLog: '😊 Feeling accomplished',
  journalEntry: 'Building healthy habits day by day.'
}, {
  id: '2',
  title: '10 Mood Logs',
  icon: <Award className="h-5 w-5 text-amber-500" />,
  date: '2024-04-14',
  description: 'Tracked mood consistently for better self-awareness',
  moodLog: '🌟 Feeling proud',
  journalEntry: 'Reached a meaningful milestone in my journey.'
}, {
  id: '3',
  title: 'First Night Session',
  icon: <Mic className="h-5 w-5 text-purple-500" />,
  date: '2024-04-13',
  description: 'Completed your first evening therapy session',
  moodLog: '😌 Feeling peaceful',
  journalEntry: 'Found a quiet moment for self-reflection.'
}, {
  id: '4',
  title: 'Recovered Streak',
  icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
  date: '2024-04-12',
  description: 'Got back on track after a brief pause',
  moodLog: '💪 Feeling resilient',
  journalEntry: 'Every setback is a setup for a comeback.'
}, {
  id: '5',
  title: 'New Topic Explored',
  icon: <MessageSquare className="h-5 w-5 text-rose-500" />,
  date: '2024-04-11',
  description: 'Discussed something new in your session',
  moodLog: '🤔 Feeling introspective',
  journalEntry: 'Stepped out of my comfort zone today.'
}];

export const StreakVault = () => {
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null);
  const navigate = useNavigate();
  
  return (
    <Card className="bg-white border-border shadow-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Your Achievements
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-sm text-skyhug-500 p-0 h-auto" onClick={() => navigate('/achievements')}>
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div 
                key={milestone.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-skyhug-50 cursor-pointer transition-colors"
                onClick={() => setSelectedMilestone(selectedMilestone?.id === milestone.id ? null : milestone)}
              >
                <div className="bg-white shadow-sm rounded-full p-1.5">
                  {milestone.icon}
                </div>
                <div>
                  <div className="font-medium">{milestone.title}</div>
                  <div className="text-xs text-muted-foreground">{milestone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
