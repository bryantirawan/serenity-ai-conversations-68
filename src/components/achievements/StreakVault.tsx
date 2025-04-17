
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

const milestones: Milestone[] = [
  {
    id: '1',
    title: '3 Days in a Row',
    icon: <Check className="h-5 w-5 text-green-500" />,
    date: '2024-04-15',
    description: 'Completed sessions three days consecutively',
    moodLog: '😊 Feeling accomplished',
    journalEntry: 'Building healthy habits day by day.'
  },
  {
    id: '2',
    title: '10 Mood Logs',
    icon: <Award className="h-5 w-5 text-amber-500" />,
    date: '2024-04-14',
    description: 'Tracked mood consistently for better self-awareness',
    moodLog: '🌟 Feeling proud',
    journalEntry: 'Reached a meaningful milestone in my journey.'
  },
  {
    id: '3',
    title: 'First Night Session',
    icon: <Mic className="h-5 w-5 text-purple-500" />,
    date: '2024-04-13',
    description: 'Completed your first evening therapy session',
    moodLog: '😌 Feeling peaceful',
    journalEntry: 'Found a quiet moment for self-reflection.'
  },
  {
    id: '4',
    title: 'Recovered Streak',
    icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
    date: '2024-04-12',
    description: 'Got back on track after a brief pause',
    moodLog: '💪 Feeling resilient',
    journalEntry: 'Every setback is a setup for a comeback.'
  },
  {
    id: '5',
    title: 'New Topic Explored',
    icon: <MessageSquare className="h-5 w-5 text-rose-500" />,
    date: '2024-04-11',
    description: 'Discussed something new in your session',
    moodLog: '🤔 Feeling introspective',
    journalEntry: 'Stepped out of my comfort zone today.'
  }
];

export const StreakVault = () => {
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null);
  const navigate = useNavigate();

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Journey Milestones</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/achievements')}
            className="text-skyhug-500 hover:text-skyhug-600"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {milestones.map((milestone) => (
              <Card
                key={milestone.id}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer
                          ${selectedMilestone?.id === milestone.id ? 'ring-2 ring-skyhug-500' : 'hover:ring-1 hover:ring-skyhug-200'}
                          bg-gradient-to-br from-white to-skyhug-50`}
                onClick={() => setSelectedMilestone(milestone)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center 
                                group-hover:scale-110 transition-transform">
                      {milestone.icon}
                    </div>
                    <h3 className="font-medium text-sm">{milestone.title}</h3>
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                  </div>
                  
                  {selectedMilestone?.id === milestone.id && (
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs">
                      <p className="font-medium mb-1">{milestone.moodLog}</p>
                      <p className="text-muted-foreground italic">{milestone.journalEntry}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
