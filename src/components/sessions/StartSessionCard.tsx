
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, PlusCircle } from 'lucide-react';

const StartSessionCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="glass-panel text-center p-6">
      <h2 className="text-xl font-medium mb-2">Ready for a Session?</h2>
      <p className="text-skyhug-600 mb-6">Let's talk it out with Serenity.</p>
      
      <div className="flex flex-col gap-3">
        <Button 
          onClick={() => navigate('/voice')}
          size="lg"
          className="rounded-full w-full py-6 text-base bg-skyhug-500 hover:bg-skyhug-600 shadow-md 
                    hover:shadow-xl transition-all hover:scale-[1.02] duration-300"
        >
          <Headphones className="mr-2 h-5 w-5" />
          Start Voice Session
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full w-full border-skyhug-200 hover:bg-skyhug-50"
          onClick={() => navigate('/schedule')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <span className="text-skyhug-500 font-medium">+10 Calm Points</span> today
      </div>
    </Card>
  );
};

export default StartSessionCard;
