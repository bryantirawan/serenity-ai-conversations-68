
import React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { MessageSquareText, Mic, ArrowRight, Brain, Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-serenity-50 to-background -z-10"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Personal AI Therapist <br />
                <span className="text-serenity-500">Always Here For You</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Talk through your thoughts and feelings with Serenity, your 24/7 AI therapy companion. 
                Chat or speak - we're here to listen and help you find clarity.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button 
                  onClick={() => navigate('/chat')}
                  className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full px-6"
                  size="lg"
                >
                  Start Chatting <MessageSquareText className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/voice')}
                  variant="outline" 
                  className="rounded-full border-serenity-200 text-foreground hover:bg-serenity-50 px-6"
                  size="lg"
                >
                  Try Voice Therapy <Mic className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-serenity-100 rounded-full animate-pulse-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[325px] md:h-[325px] bg-serenity-200 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[250px] md:h-[250px] bg-serenity-300 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 left-10 md:left-20 animate-float">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <p className="text-sm">How are you feeling today?</p>
                </div>
              </div>
              <div className="absolute bottom-20 right-10 md:right-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <p className="text-sm">Tell me more about that...</p>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-28 h-28 rounded-full bg-serenity-500 flex items-center justify-center shadow-lg">
                  <div className="absolute w-10 h-10 bg-white rounded-full top-4 left-4 opacity-30"></div>
                  <span className="text-white text-5xl font-bold">S</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Serenity Can Help You</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI therapist provides a safe space for you to explore your thoughts and feelings, 
                offering guidance and support whenever you need it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="serenity-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquareText className="h-7 w-7 text-serenity-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Text Therapy</h3>
                <p className="text-muted-foreground">
                  Chat with Serenity anytime through our intuitive messaging interface. Express yourself through text at your own pace.
                </p>
              </div>
              
              <div className="serenity-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <Mic className="h-7 w-7 text-serenity-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Voice Therapy</h3>
                <p className="text-muted-foreground">
                  Speak naturally and let Serenity listen. Sometimes it's easier to talk through your thoughts than type them.
                </p>
              </div>
              
              <div className="serenity-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-7 w-7 text-serenity-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Guided Reflection</h3>
                <p className="text-muted-foreground">
                  Serenity asks thoughtful questions to help you explore your feelings and gain new insights about yourself.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-serenity-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started with Serenity is simple. Begin your journey to better mental wellbeing in just a few steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-serenity-500">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Your Format</h3>
                <p className="text-muted-foreground text-sm">
                  Select between text-based chat or voice conversation based on what feels most comfortable.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-serenity-500">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Share Your Thoughts</h3>
                <p className="text-muted-foreground text-sm">
                  Express what's on your mind, how you're feeling, or what you'd like to work through.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-serenity-500">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Receive Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Serenity will respond with thoughtful questions and insights to help you explore your feelings.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
                <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-serenity-500">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Find Clarity</h3>
                <p className="text-muted-foreground text-sm">
                  Through continued conversation, gain new perspectives and develop coping strategies.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full px-6"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from people who have found comfort and clarity through conversations with Serenity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-serenity-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center text-serenity-500 font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Alex K.</p>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I was skeptical at first, but Serenity has been incredibly helpful during my exam stress. Having someone to talk to at 2 AM when I'm anxious has been a game-changer."
                </p>
              </div>
              
              <div className="bg-white border border-serenity-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center text-serenity-500 font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">Morgan T.</p>
                    <p className="text-sm text-muted-foreground">Professional</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The voice feature is amazing. Sometimes I just need to talk things out, and Serenity listens and asks really thoughtful questions that help me see things differently."
                </p>
              </div>
              
              <div className="bg-white border border-serenity-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-serenity-100 rounded-full flex items-center justify-center text-serenity-500 font-bold">
                    J
                  </div>
                  <div>
                    <p className="font-semibold">Jamie L.</p>
                    <p className="text-sm text-muted-foreground">Parent</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a busy parent, I rarely have time for self-care. Serenity gives me a few minutes each day to process my emotions, which has made me more patient and present."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-serenity-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Journey to Better Mental Wellbeing</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step toward clarity and peace of mind with Serenity by your side.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate('/chat')}
                variant="secondary" 
                size="lg"
                className="rounded-full px-8 bg-white text-serenity-600 hover:bg-serenity-50"
              >
                Start Chatting <MessageSquareText className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/voice')}
                variant="outline" 
                size="lg"
                className="rounded-full px-8 border-white text-white hover:bg-serenity-400"
              >
                Try Voice Therapy <Mic className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
