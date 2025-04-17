
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Headphones, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const affirmations = [
  "You're exactly where you need to be on your healing journey",
  "Your feelings are valid, and it's okay to feel them fully",
  "Small steps forward are still steps forward",
  "You have the strength to begin again, as many times as you need",
  "Your peace matters more than your productivity",
  "It's brave to ask for help when you need it",
  "You're learning and growing, even when it doesn't feel like it",
];

const AffirmationCard = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const today = new Date().toDateString();
    return today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % affirmations.length;
  });

  const handleSave = () => {
    toast({
      title: "Affirmation Saved",
      description: "Added to your collection",
    });
  };

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(affirmations[currentIndex]);
    window.speechSynthesis.speak(utterance);
  };

  const handleNew = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === currentIndex);
    setCurrentIndex(newIndex);
  };

  return (
    <Card className="bg-gradient-to-br from-[#F7F9FC] to-[#EBF2FF] border-none shadow-md mb-6 overflow-hidden relative">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-skyhug-500 animate-pulse-slow" />
          Affirmation of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <p className="text-xl font-medium text-skyhug-700 leading-relaxed text-center italic mb-6">
          {affirmations[currentIndex]}
        </p>
        
        <div className="flex justify-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-white/50"
            onClick={handleSave}
          >
            <Heart className="h-4 w-4" />
            Save
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-white/50"
            onClick={handleListen}
          >
            <Headphones className="h-4 w-4" />
            Listen
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-white/50"
            onClick={handleNew}
          >
            <RotateCw className="h-4 w-4" />
            New One
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;

