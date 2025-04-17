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
  Sparkles,
  Search,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudBackground from '@/components/CloudBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import DailyGoalsCard from '@/components/goals/DailyGoalsCard';
import EncouragementFeed from '@/components/therapy/EncouragementFeed';
import { StreakVault } from '@/components/achievements/StreakVault';

const getFirstName = (fullName: string | undefined) => {
  return fullName?.split(' ')[0] || 'Friend';
};

const AchievementBadge = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </div>
);

const SessionHistoryItem = ({ 
  day, 
  type, 
  topic, 
  moodBefore, 
  moodAfter 
}: { 
  day: string; 
  type: string; 
  topic: string; 
  moodBefore: string; 
  moodAfter: string; 
}) => (
  <div className="flex items-start gap-4 p-4 border-b border-border/30 last:border-b-0">
    <div className="w-14 text-center">
      <div className="text-sm font-medium text-skyhug-600">{day}</div>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-base font-medium">{type}</div>
      </div>
      <div className="text-sm text-muted-foreground mb-2">Topic: {topic}</div>
      <div className="flex items-center gap-2 text-sm">
        <span>Mood before: {moodBefore}</span>
        <span className="text-skyhug-400">→</span>
        <span>after: {moodAfter}</span>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState('7days');
  
  const firstName = getFirstName(user?.name);

  const moodData = [
    { day: 'Mon', value: 2, mood: '😐', note: 'Feeling neutral' },
    { day: 'Tue', value: 3, mood: '🙂', note: 'Slightly better today' },
    { day: 'Wed', value: 1, mood: '😔', note: 'Difficult day' },
    { day: 'Thu', value: 4, mood: '😄', note: 'Great progress' },
    { day: 'Fri', value: 3, mood: '🙂', note: 'Steady improvement' },
    { day: 'Sat', value: 4, mood: '😄', note: 'Feeling good' },
    { day: 'Sun', value: 5, mood: '🌟', note: 'Excellent day' },
  ];

  const sessionHistory = [
    { day: 'Monday', type: 'Voice Session with Serenity', topic: 'anxiety before presentation', moodBefore: '😐', moodAfter: '🙂' },
    { day: 'Thursday', type: 'Reflection Journal', topic: 'social burnout', moodBefore: '😔', moodAfter: '😐' },
    { day: 'Saturday', type: 'Voice Session with Serenity', topic: 'weekend planning', moodBefore: '🙂', moodAfter: '😄' },
  ];

  const achievements = [
    { title: 'First Voice Session', icon: <Award className="h-4 w-4 text-amber-500" /> },
    { title: '5 Mood Logs', icon: <Star className="h-4 w-4 text-violet-500" /> },
    { title: '1 Week of Engagement', icon: <Calendar className="h-4 w-4 text-skyhug-500" /> },
    { title: 'Longest Streak', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
    { title: 'First Insight Tag', icon: <MessageSquare className="h-4 w-4 text-rose-400" /> },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-skyhug-100">
          <p className="text-lg mb-1">{data.mood}</p>
          <p className="text-sm text-muted-foreground">{data.note}</p>
          <p className="text-xs font-medium text-skyhug-500 mt-1">{data.day}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      <CloudBackground className="opacity-90" />
      
      <main className="flex-grow px-4 pt-20 pb-8 relative z-10 max-w-5xl mx-auto w-full flex flex-col gap-8">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-medium mb-2 text-foreground">
            Hi {firstName} <span className="wave">👋</span> Here's your mind check-in for today
          </h1>
          <p className="text-lg text-skyhug-600">Small steps make big shifts. Let's take one together.</p>
        </div>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium">🧠 Your Mental Health Journey</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Here's a look at how you've been doing — mood, sessions, and clarity over time.
          </p>
          <DailyGoalsCard />
          <EncouragementFeed />
          <StreakVault />
          
          <Card className="glass-panel mb-8 overflow-hidden">
            <CardHeader className="border-b border-border/10 bg-white/30">
              <div className="flex items-center justify-between">
                <CardTitle>Mood Over Time</CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={activeTimeframe === '7days' ? 'default' : 'outline'} 
                    size="sm" 
                    className="text-xs h-8 rounded-full"
                    onClick={() => setActiveTimeframe('7days')}
                  >
                    Last 7 days
                  </Button>
                  <Button 
                    variant={activeTimeframe === '30days' ? 'default' : 'outline'} 
                    size="sm" 
                    className="text-xs h-8 rounded-full"
                    onClick={() => setActiveTimeframe('30days')}
                  >
                    30 days
                  </Button>
                  <Button 
                    variant={activeTimeframe === 'all' ? 'default' : 'outline'} 
                    size="sm" 
                    className="text-xs h-8 rounded-full"
                    onClick={() => setActiveTimeframe('all')}
                  >
                    All time
                  </Button>
                </div>
              </div>
              <CardDescription>Your emotional journey visualized</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-2 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={moodData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 5]} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => {
                      const labels = ['', '😔', '😐', '🙂', '😄', '🌟'];
                      return labels[value] || '';
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#moodGradient)" 
                    strokeWidth={3}
                    activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="glass-panel h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Session History</CardTitle>
                    <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/sessions')}>
                      <span className="text-sm text-skyhug-500">View All</span>
                      <ChevronRight className="h-4 w-4 text-skyhug-500" />
                    </Button>
                  </div>
                  <CardDescription>Your recent conversations and reflections</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Search your past sessions" 
                        className="w-full pl-10 pr-4 py-2 border-y border-border/20 bg-white/50 focus:outline-none focus:bg-white focus:border-skyhug-200 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-border/10">
                    {sessionHistory.map((session, index) => (
                      <SessionHistoryItem 
                        key={index}
                        day={session.day}
                        type={session.type}
                        topic={session.topic}
                        moodBefore={session.moodBefore}
                        moodAfter={session.moodAfter}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="glass-panel mb-6">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Milestones on your journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-16 w-16 bg-gradient-to-br from-skyhug-200 to-skyhug-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">🧠 3 Days in a Row!</h3>
                        <p className="text-sm text-muted-foreground">Keep the streak alive!</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {achievements.map((achievement, index) => (
                        <AchievementBadge 
                          key={index}
                          title={achievement.title} 
                          icon={achievement.icon} 
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel text-center p-6">
                <h2 className="text-xl font-medium mb-2">Ready for a Session?</h2>
                <p className="text-skyhug-600 mb-6">Let's talk it out with Serenity.</p>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => navigate('/voice')}
                    size="lg"
                    className="rounded-full w-full py-6 text-base bg-skyhug-500 hover:bg-skyhug-600 shadow-md 
                              hover:shadow-xl transition-all hover:scale-[1.02] duration-300"
                  >
                    <Headphones className="mr-2 h-5 w-5" />
                    Start Voice Session
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-full w-full border-skyhug-200 hover:bg-skyhug-50"
                    onClick={() => navigate('/schedule')}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="text-skyhug-500 font-medium">+10 Calm Points</span> today
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
