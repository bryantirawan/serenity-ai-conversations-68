
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';
import SessionHistoryItem from './SessionHistoryItem';

interface SessionData {
  day: string;
  type: string;
  topic: string;
  moodBefore: string;
  moodAfter: string;
}

interface SessionHistoryCardProps {
  sessionHistory: SessionData[];
}

const SessionHistoryCard = ({ sessionHistory }: SessionHistoryCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Session History</CardTitle>
          <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/sessions')}>
            <span className="text-sm text-skyhug-500">View All</span>
            <ChevronRight className="h-4 w-4 text-skyhug-500" />
          </Button>
        </div>
        <CardDescription>Your recent conversations and reflections</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search your past sessions" 
              className="w-full pl-10 pr-4 py-2 border-y border-border/20 bg-white/50 focus:outline-none focus:bg-white focus:border-skyhug-200 transition-colors"
            />
          </div>
        </div>
        <div className="divide-y divide-border/10">
          {sessionHistory.map((session, index) => (
            <SessionHistoryItem 
              key={index}
              day={session.day}
              type={session.type}
              topic={session.topic}
              moodBefore={session.moodBefore}
              moodAfter={session.moodAfter}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionHistoryCard;
