
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  color: string;
  iconColor: string;
}

const CategoryCard = ({ icon: Icon, title, color, iconColor }: CategoryCardProps) => {
  return (
    <div className={`rounded-xl p-6 ${color} transition-transform hover:scale-105 cursor-pointer`}>
      <div className="mb-4">
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

export default CategoryCard;
