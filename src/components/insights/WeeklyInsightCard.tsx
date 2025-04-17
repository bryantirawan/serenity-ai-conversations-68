
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles, ArrowRight, TrendingUp, Clock } from 'lucide-react';

interface WeeklyInsightProps {
  mostFrequentEmotion: string;
  bestShift: {
    day: string;
    from: string;
    to: string;
  };
  wordTrend: {
    word: string;
    count: number;
  };
  timeInsight: string;
}

const WeeklyInsightCard = () => {
  // This would come from your data analysis in a real app
  const mockInsights: WeeklyInsightProps = {
    mostFrequentEmotion: "😊",
    bestShift: {
      day: "Sat",
      from: "😐",
      to: "🌟",
    },
    wordTrend: {
      word: "Overwhelmed",
      count: 3,
    },
    timeInsight: "You've been doing sessions mostly late in the day. Consider trying morning for a reset.",
  };

  return (
    <Card className="mb-8 overflow-hidden animate-fade-in">
      <CardHeader className="border-b border-border/10 bg-gradient-to-r from-skyhug-50 to-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-skyhug-500" />
            This Week, You Felt...
          </CardTitle>
          <span className="text-xs text-muted-foreground">Updates every Sunday</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Most frequent emotion</p>
                <p className="text-2xl font-medium">{mockInsights.mostFrequentEmotion}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Strongest positive shift</p>
                <p className="flex items-center gap-2">
                  <span className="text-sm font-medium">{mockInsights.bestShift.day}</span>
                  <span>{mockInsights.bestShift.from}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{mockInsights.bestShift.to}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Word trend</p>
              <p className="text-sm">
                "{mockInsights.wordTrend.word}" mentioned {mockInsights.wordTrend.count}×
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-skyhug-500 mt-1" />
              <div>
                <p className="text-sm">Timing Insight</p>
                <p className="text-sm text-muted-foreground">{mockInsights.timeInsight}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyInsightCard;
