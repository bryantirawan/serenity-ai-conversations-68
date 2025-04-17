
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Headphones, Calendar, History, LineChart, Sun } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudBackground from '@/components/CloudBackground';

const MoodEmoji = ({ emoji, label, selected, onClick }: { emoji: string; label: string; selected: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full transition-all duration-300 ${selected ? 'bg-skyhug-100 scale-110' : 'hover:bg-white/30'}`}
    aria-label={`Select mood: ${label}`}
  >
    <span className="text-2xl" role="img" aria-label={label}>{emoji}</span>
  </button>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  // Get user's first name for personalized greeting
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  const moods = [
    { emoji: '😔', label: 'Sad' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙂', label: 'Slightly Happy' },
    { emoji: '😄', label: 'Happy' },
    { emoji: '🌟', label: 'Excellent' }
  ];

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    // In a real app, you might want to save this to the user's profile or session
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Animated cloud background */}
      <CloudBackground className="opacity-80" />
      
      <main className="flex-grow flex items-center justify-center px-4 relative z-10">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 md:p-10 text-center">
          {/* Personal greeting */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground flex items-center justify-center gap-2">
              Hey {firstName} <span className="wave">👋</span>
            </h1>
            <h2 className="text-xl text-skyhug-600 font-medium">Ready for a reset?</h2>
          </div>
          
          {/* Illustration */}
          <div className="flex justify-center items-center my-6 relative">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-skyhug-100 rounded-full opacity-30 animate-pulse-slow"></div>
              <Headphones className="h-16 w-16 text-skyhug-500" />
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            Tap below to begin your personal voice therapy session.
          </p>
          
          {/* Main CTA Button */}
          <Button 
            onClick={() => navigate('/voice')}
            size="lg"
            className="rounded-full w-full py-7 text-lg bg-skyhug-500 hover:bg-skyhug-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-300"
          >
            <Headphones className="mr-2 h-5 w-5" />
            Start Voice Session
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4 mb-6 italic">
            Your AI therapist is here, anytime you need a reset.
          </p>
          
          {/* Scheduled session reminder */}
          <div className="bg-white/50 rounded-xl p-4 mb-6 shadow-sm border border-skyhug-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-skyhug-600 mr-2" />
                <span className="text-sm font-medium">Scheduled next session: Tuesday 8am</span>
              </div>
              <button className="text-xs text-skyhug-600 underline">
                add to calendar
              </button>
            </div>
          </div>
          
          {/* Mood check-in */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">How are you feeling right now?</p>
            <div className="flex justify-center space-x-2">
              {moods.map((mood, index) => (
                <MoodEmoji 
                  key={index}
                  emoji={mood.emoji}
                  label={mood.label}
                  selected={selectedMood === index}
                  onClick={() => handleMoodSelect(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Secondary actions */}
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
