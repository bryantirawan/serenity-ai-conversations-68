
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const EmotionalCheckInReminder = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';
  const handleCheckIn = () => {
    navigate('/session');
    toast({
      title: "Calm Points Earned! ⭐",
      description: "+10 points for checking in. Keep up the great work!"
    });
  };
  return <Card className="bg-white border-[#E5E7EB] shadow-lg mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2 ring-serenity-100 animate-pulse-slow">
              <AvatarFallback className="bg-serenity-500 text-white">
                S
              </AvatarFallback>
            </Avatar>
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-serenity-400" />
          </div>
          
          <div className="flex-1">
            <div className="mb-1 text-sm text-muted-foreground">
              Sky
            </div>
            <p className="text-base mb-4">
              Hey {firstName}, I noticed your week had some ups and downs. Want to check in together?
            </p>
            
            <div className="flex items-center justify-between">
              <Button onClick={handleCheckIn} size="sm" className="bg-serenity-500 hover:bg-serenity-600 rounded-full transform transition-all hover:scale-105">
                Start a Session
              </Button>
              
              <div className="flex items-center gap-1 text-sm text-serenity-600">
                <Star className="h-4 w-4" />
                <span>+10 Calm Points</span>
              </div>
            </div>
            
            
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default EmotionalCheckInReminder;

