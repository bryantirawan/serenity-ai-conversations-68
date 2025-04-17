
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flower, Cloud, Sparkles } from 'lucide-react';

interface ProgressItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
}

const CalmMeter = () => {
  const progressItems: ProgressItem[] = [
    {
      id: 'plant',
      title: 'Growth',
      icon: <Flower className="h-5 w-5 text-green-500" />,
      progress: 65,
      color: 'bg-green-500',
    },
    {
      id: 'sky',
      title: 'Vibrancy',
      icon: <Cloud className="h-5 w-5 text-skyhug-500" />,
      progress: 45,
      color: 'bg-skyhug-500',
    },
    {
      id: 'clarity',
      title: 'Clarity',
      icon: <Sparkles className="h-5 w-5 text-violet-500" />,
      progress: 30,
      color: 'bg-violet-500',
    },
  ];

  return (
    <Card className="glass-panel mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-skyhug-500" />
          Calm Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {progressItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.progress}%</span>
              </div>
              <Progress 
                value={item.progress} 
                className={`h-2 [&>[role=progressbar]]:${item.color}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalmMeter;
