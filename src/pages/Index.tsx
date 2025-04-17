
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import SupportOptions from '@/components/landing/SupportOptions';
import MoodTrackingPreview from '@/components/landing/MoodTrackingPreview';
import { Button } from '@/components/ui/button';
import { MessageSquareText, Brain, Heart, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Mood Tracking Preview with new background */}
        <section className="py-32 px-4 md:px-8 bg-emotion-reflection/30">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Track Your Skies Over Time</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See your mood shift, your sessions grow, and your mental clarity deepen — all in one visual timeline.
            </p>
          </div>
          <MoodTrackingPreview />
        </section>

        {/* Support Options with white background */}
        <section className="bg-white">
          <SupportOptions />
        </section>

        {/* Features Section with soft lilac background */}
        <section className="py-32 px-4 md:px-8 bg-emotion-calm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">How Serenity Can Help You</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI therapist provides a safe space for you to explore your thoughts and feelings, 
                offering guidance and support whenever you need it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-emotion-joy to-white border border-serenity-100 transition-all duration-300 hover:shadow-lg">
                <div className="h-16 w-16 bg-serenity-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquareText className="h-8 w-8 text-serenity-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Voice Conversations</h3>
                <p className="text-muted-foreground">
                  Speak naturally with our AI therapist, just like talking to a trusted friend.
                </p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-emotion-clarity to-white border border-serenity-100 transition-all duration-300 hover:shadow-lg">
                <div className="h-16 w-16 bg-serenity-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-serenity-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Guided Prompts</h3>
                <p className="text-muted-foreground">
                  Get personalized prompts that help you explore your thoughts and emotions deeply.
                </p>
              </div>
              
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-emotion-calm to-white border border-serenity-100 transition-all duration-300 hover:shadow-lg">
                <div className="h-16 w-16 bg-serenity-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-serenity-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Mood Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your emotional journey and track your progress over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA with new gradient */}
        <section className="py-32 px-4 md:px-8 bg-gradient-to-br from-serenity-100 to-emotion-clarity">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start your journey to clarity — one skyhug at a time</h2>
            <p className="text-xl mb-12 text-muted-foreground">
              Free to try, no account required. Just say hi.
            </p>
            <Button 
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-serenity-500 to-serenity-600 text-white hover:opacity-90 group"
              onClick={() => window.location.href = '/voice'}
            >
              Begin Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
