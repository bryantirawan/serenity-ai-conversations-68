
import React from 'react';

interface SessionHistoryItemProps {
  day: string;
  type: string;
  topic: string;
  moodBefore: string;
  moodAfter: string;
}

const SessionHistoryItem = ({ 
  day, 
  type, 
  topic, 
  moodBefore, 
  moodAfter 
}: SessionHistoryItemProps) => (
  <div className="flex items-start gap-4 p-4 border-b border-border/30 last:border-b-0">
    <div className="w-14 text-center">
      <div className="text-sm font-medium text-skyhug-600">{day}</div>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-base font-medium">{type}</div>
      </div>
      <div className="text-sm text-muted-foreground mb-2">Topic: {topic}</div>
      <div className="flex items-center gap-2 text-sm">
        <span>Mood before: {moodBefore}</span>
        <span className="text-skyhug-400">→</span>
        <span>after: {moodAfter}</span>
      </div>
    </div>
  </div>
);

export default SessionHistoryItem;
