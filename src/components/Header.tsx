
import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <Logo />
      
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-serenity-500 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/chat')}
            className="text-foreground hover:text-serenity-500 transition-colors"
          >
            Chat
          </button>
          <button 
            onClick={() => navigate('/voice')}
            className="text-foreground hover:text-serenity-500 transition-colors"
          >
            Voice
          </button>
          <button 
            className="text-foreground hover:text-serenity-500 transition-colors"
          >
            About
          </button>
        </nav>
        <Button 
          variant="default" 
          className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full"
        >
          Get Started
        </Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 pt-10">
              <button 
                onClick={() => navigate('/')}
                className="text-foreground hover:text-serenity-500 transition-colors text-lg py-2"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="text-foreground hover:text-serenity-500 transition-colors text-lg py-2"
              >
                Chat
              </button>
              <button 
                onClick={() => navigate('/voice')}
                className="text-foreground hover:text-serenity-500 transition-colors text-lg py-2"
              >
                Voice
              </button>
              <button 
                className="text-foreground hover:text-serenity-500 transition-colors text-lg py-2"
              >
                About
              </button>
              <Button 
                variant="default" 
                className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full mt-4"
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
