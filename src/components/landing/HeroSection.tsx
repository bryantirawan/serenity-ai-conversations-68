
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MessageSquareText, ArrowRight } from 'lucide-react';
import AudioWavePreview from './AudioWavePreview';
import TrustMarkers from './TrustMarkers';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-serenity-50 to-background -z-10" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-serenity-100 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-serenity-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-serenity-600 to-serenity-800 bg-clip-text text-transparent">
              Talk to an AI Therapist That Understands Your Skies
            </h1>
            <p className="text-2xl font-light text-serenity-600">
              Skyhug adapts to your emotional weather — sunshine, storm, or still. Talk or speak with your AI therapist anytime you need support.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <Button 
              onClick={() => navigate('/voice')} 
              className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full px-8 group transition-all duration-300 hover:scale-105" 
              size="lg"
            >
              Try Voice Therapy 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => navigate('/chat')} 
              variant="outline" 
              className="rounded-full border-serenity-200 text-foreground hover:bg-serenity-50 px-8" 
              size="lg"
            >
              Start Chatting <MessageSquareText className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Free to try. No sign-up required.
          </p>

          <TrustMarkers />
        </div>
        
        <div className="relative h-[500px] w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <AudioWavePreview />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-serenity-600">
                  Serenity is listening...
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 left-10 md:left-20 animate-float">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
              <p className="text-lg text-serenity-600">Take your time — I'm here.</p>
            </div>
          </div>
          
          <div 
            className="absolute bottom-1/4 right-10 md:right-20 animate-float" 
            style={{ animationDelay: '1s' }}
          >
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
              <p className="text-lg text-serenity-600">Let's talk about it together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
