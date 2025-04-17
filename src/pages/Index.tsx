
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import CloudBackground from '@/components/CloudBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Index = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  // Mock mood data for the chart
  const moodData = [
    { day: 'Mon', value: 2 },
    { day: 'Tue', value: 3 },
    { day: 'Wed', value: 1 },
    { day: 'Thu', value: 4 },
    { day: 'Fri', value: 3 },
    { day: 'Sat', value: 4 },
    { day: 'Sun', value: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced cloud background with softer gradient */}
      <CloudBackground className="opacity-90" />
      
      <main className="flex-grow px-4 pt-20 pb-8 relative z-10 max-w-5xl mx-auto w-full">
        {/* Personalized greeting with lighter font weight */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium mb-2 text-foreground">
            Hi {firstName} <span className="wave">👋</span> Here's your mind check-in for today
          </h1>
          <p className="text-lg text-skyhug-600">Small steps make big shifts. Let's take one together.</p>
        </div>
        
        {/* Mental Health Journey Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-skyhug-600" />
            <h2 className="text-2xl font-medium">Your Mental Health Journey</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Here's a look at how you've been doing — mood, sessions, and clarity over time.
          </p>
          
          <div className="text-center text-sm text-muted-foreground bg-sky-50/50 py-3 px-4 rounded-lg mb-8 border border-skyhug-100/50">
            There's no perfect streak. Just honest reflection. We're proud of you for being here.
          </div>
          
          {/* Mood Over Time Section */}
          <Card className="glass-panel mb-8">
            <CardHeader className="border-b border-border/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mood Over Time</CardTitle>
                  <CardDescription>Your emotional journey visualized</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="rounded-full">Last 7 days</Button>
                  <Button variant="outline" size="sm" className="rounded-full">30 days</Button>
                  <Button variant="outline" size="sm" className="rounded-full">All time</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#moodGradient)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {!user ? (
            <div className="flex flex-col items-center gap-4 mt-12">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/login">Get Started</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link to="/login" className="text-skyhug-600 hover:underline">Log in</Link>
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default Index;
