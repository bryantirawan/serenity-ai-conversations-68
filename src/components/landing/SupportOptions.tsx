
import React from 'react';
import { Cloud, CloudRain, CloudLightning, Brain, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const supportCards = [
  { icon: Cloud, title: "Lift My Mood", route: "/voice" },
  { icon: CloudRain, title: "Talk Through Something Tough", route: "/voice" },
  { icon: CloudLightning, title: "Calm Anxiety", route: "/voice" },
  { icon: Brain, title: "Understand My Thoughts", route: "/chat" },
  { icon: Target, title: "Set a Mental Goal", route: "/chat" },
  { icon: CheckCircle, title: "Check In With Myself", route: "/chat" },
];

const SupportOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Kind of Support Are You Needing Today?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCards.map((card, index) => (
            <button
              key={index}
              onClick={() => navigate(card.route)}
              className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 group border border-serenity-100"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-serenity-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <card.icon className="h-8 w-8 text-serenity-500" />
                </div>
                <h3 className="text-xl font-medium text-foreground">{card.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportOptions;
