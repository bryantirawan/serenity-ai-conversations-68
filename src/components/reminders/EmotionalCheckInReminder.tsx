
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const EmotionalCheckInReminder = () => {
  const navigate = useNavigate();
  const messages = [
    {
      text: "Hi, Sky here! 👋 Just wanted to check in - haven't seen your mood log today.",
      points: 10
    },
    {
      text: "Your last few days were up and down — I'm here if you want to talk.",
      points: 10
    },
    {
      text: "Taking a moment to reflect can make a big difference. Want to check in?",
      points: 10
    }
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const handleCheckIn = () => {
    navigate('/mood-log');
    toast({
      title: "Calm Points Earned! ⭐",
      description: `+${randomMessage.points} points for checking in. Keep up the great work!`,
    });
  };

  return (
    <Card className="bg-white border-border shadow-sm mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-serenity-100 p-2 rounded-full">
            <BellRing className="h-5 w-5 text-serenity-600" />
          </div>
          <div className="flex-1">
            <p className="text-base mb-3">{randomMessage.text}</p>
            <div className="flex items-center justify-between">
              <Button 
                onClick={handleCheckIn}
                variant="default" 
                size="sm"
                className="bg-serenity-500 hover:bg-serenity-600"
              >
                Check In Now
              </Button>
              <div className="flex items-center gap-1 text-sm text-serenity-600">
                <Star className="h-4 w-4" />
                <span>+{randomMessage.points} Calm Points</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalCheckInReminder;
