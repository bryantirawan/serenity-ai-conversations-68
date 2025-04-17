
import React from 'react';
import { Shield, Heart, Brain } from 'lucide-react';

const TrustMarkers = () => {
  return (
    <div className="flex flex-col gap-4 text-sm text-muted-foreground mt-4">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-serenity-500" />
        <span>Trusted by 10,000+ users</span>
      </div>
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-serenity-500" />
        <span>Backed by science – inspired by CBT, ACT & mindfulness practices</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4 text-serenity-500" />
        <span>Free to try, no account required</span>
      </div>
    </div>
  );
};

export default TrustMarkers;
