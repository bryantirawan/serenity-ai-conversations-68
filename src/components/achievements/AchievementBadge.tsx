
import React from 'react';

interface AchievementBadgeProps {
  title: string;
  icon: React.ReactNode;
}

const AchievementBadge = ({ title, icon }: AchievementBadgeProps) => (
  <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </div>
);

export default AchievementBadge;
