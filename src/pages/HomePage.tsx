
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Brain, History, LineChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudBackground from '@/components/CloudBackground';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get user's first name for personalized greeting
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Animated cloud background */}
      <CloudBackground className="opacity-70" />
      
      <main className="flex-grow flex items-center justify-center px-4 relative z-10">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 md:p-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Welcome back, {firstName}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10">
            How are you feeling today?
          </p>
          
          <Button 
            onClick={() => navigate('/chat')}
            size="lg"
            className="rounded-full w-full py-6 text-lg bg-skyhug-500 hover:bg-skyhug-600"
          >
            <Brain className="mr-2 h-5 w-5" />
            Start AI Therapy Session
          </Button>
          
          <p className="text-sm text-muted-foreground mt-3 mb-8">
            Your AI therapist is here for you 24/7
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              className="rounded-full border-skyhug-200 hover:bg-skyhug-50"
              onClick={() => navigate('/history')}
            >
              <History className="mr-2 h-4 w-4" />
              View Past Sessions
            </Button>
            
            <Button 
              variant="outline" 
              className="rounded-full border-skyhug-200 hover:bg-skyhug-50"
              onClick={() => navigate('/mood')}
            >
              <LineChart className="mr-2 h-4 w-4" />
              Mood Tracker
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
