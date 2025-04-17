
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM"
];

const SessionSchedule = () => {
  const [frequency, setFrequency] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConfirmSchedule = () => {
    if (!date || !timeSlot || !frequency) {
      toast({
        title: "Please complete all fields",
        description: "Choose a frequency, date, and time for your session",
        variant: "destructive",
      });
      return;
    }

    // Format the date for display
    const formattedDate = format(date, "EEEE, MMMM d, yyyy");
    
    // In a real app, this would save to a database
    // For now we'll just show a toast and navigate home
    toast({
      title: "Session Scheduled!",
      description: `Your next session is on ${formattedDate} at ${timeSlot}`,
    });

    // Add to calendar logic would go here
    
    // Navigate back to home
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-serenity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-serenity-100 animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-serenity-100 to-serenity-50 rounded-t-lg">
          <CardTitle className="text-xl md:text-2xl text-center text-serenity-900">
            Schedule Your Next Session
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">How often would you like to talk?</h3>
            
            <RadioGroup value={frequency} onValueChange={setFrequency} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="cursor-pointer">Daily</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="few-days" id="few-days" />
                <Label htmlFor="few-days" className="cursor-pointer">Every few days</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="cursor-pointer">Weekly</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="as-needed" id="as-needed" />
                <Label htmlFor="as-needed" className="cursor-pointer">As needed</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Pick a time for your next session</h3>
            
            <div className="grid gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-2 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-1/2">
            Go Back
          </Button>
          <Button 
            onClick={handleConfirmSchedule} 
            className="w-1/2 bg-serenity-500 hover:bg-serenity-600"
          >
            Confirm Schedule
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SessionSchedule;
