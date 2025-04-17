
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Headphones, 
  Calendar, 
  History, 
  LineChart, 
  Award, 
  ChevronRight, 
  Star, 
  Clock, 
  PlusCircle, 
  Sparkles 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudBackground from '@/components/CloudBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Emoji component with enhanced UI
const MoodEmoji = ({ emoji, label, selected, onClick }: { emoji: string; label: string; selected: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-full transition-all duration-300 ${selected ? 'bg-skyhug-100 scale-110 shadow-md' : 'hover:bg-white/30'}`}
    aria-label={`Select mood: ${label}`}
  >
    <span className="text-4xl" role="img" aria-label={label}>{emoji}</span>
  </button>
);

// Progress bar for mood history
const MoodHistoryBar = ({ value, emoji }: { value: number; emoji: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl mb-1">{emoji}</div>
    <div className="w-8 h-24 bg-white/50 rounded-full overflow-hidden flex flex-col-reverse">
      <div 
        className="bg-gradient-to-t from-skyhug-300 to-skyhug-500 rounded-full"
        style={{ height: `${value}%` }}
      ></div>
    </div>
  </div>
);

// Badge component for achievements
const AchievementBadge = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </div>
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

  // Mock mood history data for the past 7 days
  const moodHistory = [
    { day: 'Mon', value: 30, emoji: '😐' },
    { day: 'Tue', value: 45, emoji: '🙂' },
    { day: 'Wed', value: 25, emoji: '😔' },
    { day: 'Thu', value: 60, emoji: '😄' },
    { day: 'Fri', value: 50, emoji: '🙂' },
    { day: 'Sat', value: 75, emoji: '😄' },
    { day: 'Sun', value: 85, emoji: '🌟' },
  ];

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    // In a real app, you might want to save this to the user's profile or session
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Enhanced cloud background with softer gradient */}
      <CloudBackground className="opacity-90" />
      
      <main className="flex-grow px-4 pt-16 pb-8 relative z-10 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Personal greeting with lighter font weight */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-medium mb-2 text-foreground">
            Hi {firstName} <span className="wave">👋</span> Here's your mind check-in for today
          </h1>
          <p className="text-lg text-skyhug-600">Small steps make big shifts. Let's take one together.</p>
        </div>
        
        {/* Mood History Section */}
        <Card className="glass-panel overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Your Recent Mood</span>
              <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/mood')}>
                <span className="text-sm text-skyhug-500">View History</span>
                <ChevronRight className="h-4 w-4 text-skyhug-500" />
              </Button>
            </CardTitle>
            <CardDescription>We noticed you've been feeling more balanced lately 🌱</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end pt-2 pb-4">
              {moodHistory.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <MoodHistoryBar value={day.value} emoji={day.emoji} />
                  <span className="text-xs mt-2 text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Tile (Gamified) */}
        <Card className="glass-panel relative overflow-hidden">
          <div className="absolute right-0 top-0 transform translate-x-6 -translate-y-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-skyhug-100/60 rounded-full opacity-70 animate-pulse-slow"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-skyhug-400 animate-float" />
            </div>
          </div>
          
          <CardHeader>
            <CardTitle>Clarity Streak</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-skyhug-200 to-skyhug-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">🧠 3 Days in a Row!</h3>
                <p className="text-muted-foreground">Keep the streak alive — even a 2-minute session counts!</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <AchievementBadge title="First Voice Session Completed" icon={<Award className="h-4 w-4 text-skyhug-500" />} />
              <AchievementBadge title="5 Mood Logs" icon={<Star className="h-4 w-4 text-amber-500" />} />
              <AchievementBadge title="1 Week of Consistency" icon={<Sparkles className="h-4 w-4 text-violet-500" />} />
            </div>
          </CardContent>
        </Card>
        
        {/* Next Session Overview */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle>Next Scheduled Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-skyhug-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-skyhug-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Tuesday @ 8:00 AM</h3>
                <p className="text-sm text-muted-foreground">Morning check-in</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="rounded-full border-skyhug-200">
                <Calendar className="mr-1 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-skyhug-200">
                <Clock className="mr-1 h-4 w-4" />
                Reschedule
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" className="rounded text-skyhug-500" />
                Remind me with a message from Serenity
              </label>
            </div>
          </CardContent>
        </Card>
        
        {/* Call to Action */}
        <Card className="glass-panel text-center p-6">
          <h2 className="text-2xl font-medium mb-2">Ready for a Session?</h2>
          <p className="text-skyhug-600 mb-6">Let's talk it out with Serenity.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/voice')}
              size="lg"
              className="rounded-full w-full sm:w-auto py-6 text-lg bg-skyhug-500 hover:bg-skyhug-600 shadow-md 
                        hover:shadow-xl transition-all hover:scale-[1.02] duration-300"
            >
              <Headphones className="mr-2 h-5 w-5" />
              Start Voice Session
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full w-full sm:w-auto border-skyhug-200 hover:bg-skyhug-50"
              onClick={() => navigate('/schedule')}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Schedule New Session
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="text-skyhug-500 font-medium">+10 Calm Points</span> today
          </div>
        </Card>
        
        {/* Journal Reflection Prompt */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle>Pause. Reflect.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4 italic">
              "What's something that helped you feel grounded this week?"
            </p>
            
            <textarea 
              className="w-full p-3 rounded-lg border border-skyhug-100 focus:ring-2 focus:ring-skyhug-300 focus:border-transparent"
              rows={3}
              placeholder="Type your reflection here..."
            ></textarea>
            
            <div className="flex justify-end mt-2">
              <Button variant="ghost" className="rounded-full" size="sm">
                <Headphones className="mr-1 h-4 w-4" />
                Voice Log
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Mood check-in with increased spacing */}
        <Card className="glass-panel">
          <CardHeader className="pb-0">
            <CardTitle>Today's Mood</CardTitle>
            <CardDescription>Pause. Check in with yourself.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between">
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
          </CardContent>
        </Card>
        
        {/* Secondary actions with refined styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
