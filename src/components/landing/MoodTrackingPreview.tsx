
import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 75 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 80 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 95 },
];

const MoodTrackingPreview = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 glass-panel">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Mood Over Time</h3>
        <p className="text-muted-foreground">Your emotional journey visualized</p>
        
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-1 rounded-full bg-primary text-white text-sm">Last 7 days</button>
          <button className="px-4 py-1 rounded-full text-sm text-muted-foreground">30 days</button>
          <button className="px-4 py-1 rounded-full text-sm text-muted-foreground">All time</button>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6379ed"
                strokeWidth={3}
                dot={false}
                fill="url(#colorGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          There's no perfect streak. Just honest reflection. We're proud of you for being here.
        </p>
      </div>
    </div>
  );
};

export default MoodTrackingPreview;
