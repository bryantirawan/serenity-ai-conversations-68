
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, HeartPulse, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const ClarityToolButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  className 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
  className?: string;
}) => (
  <Button
    variant="outline"
    className={cn(
      "w-full flex items-center gap-3 p-4 h-auto text-left bg-white/50 hover:bg-white/80 transition-colors",
      className
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span className="font-medium">{label}</span>
  </Button>
);

export const ClarityKit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  const startBreathing = () => {
    // TODO: Implement breathing exercise
    console.log('Starting breathing exercise');
  };

  const goToJournal = () => {
    navigate('/chat', { state: { prompt: 'journal' } });
  };

  const replayLastSession = () => {
    navigate('/sessions');
  };

  const scheduleCheckIn = () => {
    navigate('/schedule');
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {firstName}'s Calm Kit
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ClarityToolButton
          icon={HeartPulse}
          label="Guided Breathing (2 mins)"
          onClick={startBreathing}
        />
        <ClarityToolButton
          icon={BookOpen}
          label="Go to Journal Prompt"
          onClick={goToJournal}
        />
        <ClarityToolButton
          icon={History}
          label="Replay Last Session"
          onClick={replayLastSession}
        />
        <ClarityToolButton
          icon={Calendar}
          label="Schedule Future Check-in"
          onClick={scheduleCheckIn}
        />
      </CardContent>
    </Card>
  );
};
