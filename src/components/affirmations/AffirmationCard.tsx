
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

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
  // Get a random affirmation but use the date as seed so it stays the same all day
  const today = new Date().toDateString();
  const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % affirmations.length;
  
  return (
    <Card className="bg-white/40 backdrop-blur-md border-blue-100 shadow-md mb-6 max-w-xl mx-auto transition-all hover:shadow-lg">
      <CardHeader className="pb-2 px-6 pt-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-500 tracking-wide uppercase">
          <Sparkles className="h-4 w-4 animate-pulse-slow text-blue-400" />
          Affirmation of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <p className="text-xl md:text-2xl font-medium text-gray-800 italic leading-relaxed text-center">
          "{affirmations[index]}"
        </p>
        <p className="text-sm text-gray-400 italic mt-4 text-center">
          Take a moment to let these words sink in
        </p>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
