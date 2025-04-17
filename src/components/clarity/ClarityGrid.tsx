
import React from 'react';
import { format, parseISO, eachDayOfInterval, subDays } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Star } from 'lucide-react';

type ActivityType = 'none' | 'mood' | 'session' | 'full';

interface DayActivity {
  date: Date;
  type: ActivityType;
  mood?: string;
  hasStreak?: boolean;
}

// Sample data - replace with real data later
const generateSampleData = (days: number): DayActivity[] => {
  const today = new Date();
  const interval = eachDayOfInterval({
    start: subDays(today, days - 1),
    end: today
  });

  return interval.map((date, index) => {
    // Sample data pattern - replace with real data
    const activities: ActivityType[] = ['none', 'mood', 'session', 'full'];
    const type = activities[index % 4];
    
    return {
      date,
      type,
      mood: type !== 'none' ? 'calmer after session' : undefined,
      hasStreak: index >= 6 && index % 7 === 6 // Weekly streak example
    };
  });
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case 'mood':
      return 'bg-[#D3E4FD] hover:bg-[#C2D9FC]';
    case 'session':
      return 'bg-serenity-400 hover:bg-serenity-500';
    case 'full':
      return 'bg-serenity-600 hover:bg-serenity-700';
    default:
      return 'bg-gray-100 hover:bg-gray-200';
  }
};

const getActivityLabel = (type: ActivityType) => {
  switch (type) {
    case 'mood':
      return 'Mood logged';
    case 'session':
      return 'Session completed';
    case 'full':
      return 'Session and journal entry';
    default:
      return 'No check-in';
  }
};

const ClarityGrid = () => {
  const activities = generateSampleData(91); // Last 3 months
  const weeks = [];
  
  for (let i = 0; i < activities.length; i += 7) {
    weeks.push(activities.slice(i, i + 7));
  }

  return (
    <Card className="bg-white border-border shadow-sm mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Clarity Grid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <div className="w-8" /> {/* Spacer for alignment */}
            <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
          </div>
          
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-[auto_1fr] gap-2 items-center">
              <div className="text-xs text-muted-foreground w-8 text-right">
                {format(week[0].date, 'MMM')}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => (
                  <TooltipProvider key={dayIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <div
                            className={`w-4 h-4 rounded-sm ${getActivityColor(day.type)} transition-colors`}
                          />
                          {day.hasStreak && (
                            <Star className="absolute -top-2 -right-2 w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          {format(day.date, 'MMMM d')} – {getActivityLabel(day.type)}
                          {day.mood && <span><br/>{day.mood}</span>}
                          {day.hasStreak && <span><br/>🌟 7-day streak!</span>}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex items-center justify-end gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gray-100" />
              <span className="text-muted-foreground">No check-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#D3E4FD]" />
              <span className="text-muted-foreground">Mood logged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-serenity-400" />
              <span className="text-muted-foreground">Session done</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-serenity-600" />
              <span className="text-muted-foreground">Session + Journal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClarityGrid;
