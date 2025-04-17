
import React from 'react';
import { Cloud, CloudRain, CloudLightning, Brain, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const supportCards = [
  { 
    icon: Cloud, 
    title: "Lift My Mood", 
    route: "/voice",
    gradient: "from-mood-happy to-white"
  },
  { 
    icon: CloudRain, 
    title: "Talk Through Something Tough", 
    route: "/voice",
    gradient: "from-emotion-reflection to-white"
  },
  { 
    icon: CloudLightning, 
    title: "Calm Anxiety", 
    route: "/voice",
    gradient: "from-emotion-clarity to-white"
  },
  { 
    icon: Brain, 
    title: "Understand My Thoughts", 
    route: "/chat",
    gradient: "from-emotion-calm to-white"
  },
  { 
    icon: Target, 
    title: "Set a Mental Goal", 
    route: "/chat",
    gradient: "from-mood-meh/30 to-white"
  },
  { 
    icon: CheckCircle, 
    title: "Check In With Myself", 
    route: "/chat",
    gradient: "from-serenity-100 to-white"
  },
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
              className={`p-8 rounded-2xl bg-gradient-to-br ${card.gradient} hover:shadow-lg transition-all duration-300 group border border-serenity-100 animate-float`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
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
