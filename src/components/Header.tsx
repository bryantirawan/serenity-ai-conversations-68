
import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu, LogIn, UserPlus, LogOut, User, Home, Settings, MessageSquare, Mic } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();
  const {
    toast
  } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.'
    });
    navigate('/');
  };

  const NavLink = ({ to, label, icon: Icon }: { to: string, label: string, icon?: React.ComponentType<any> }) => (
    <button 
      onClick={() => navigate(to)} 
      className={`transition-colors flex items-center gap-2 px-2 py-1 rounded-full hover:bg-skyhug-50 
        ${location.pathname === to ? 'text-skyhug-500 font-medium' : 'text-foreground hover:text-skyhug-500'}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );

  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <Logo />
      
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-4">
          {isAuthenticated && (
            <NavLink to="/home" label="Home" icon={Home} />
          )}
          <NavLink to="/chat" label="Chat" icon={MessageSquare} />
          <NavLink to="/voice" label="Voice" icon={Mic} />
        </nav>
        
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full border-skyhug-200 gap-2 hover:border-skyhug-300 hover:bg-skyhug-50 transition-colors">
                <User className="h-4 w-4 text-skyhug-500" />
                <span className="font-medium">{user?.name || 'User'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2">
              <DropdownMenuItem onClick={() => navigate('/home')} className="cursor-pointer rounded-lg transition-colors gap-2 py-2">
                <Home className="h-4 w-4 text-skyhug-500" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/sessions')} className="cursor-pointer rounded-lg transition-colors gap-2 py-2">
                <MessageSquare className="h-4 w-4 text-skyhug-500" />
                <span>Session History</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer rounded-lg transition-colors gap-2 py-2">
                <Settings className="h-4 w-4 text-skyhug-500" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-lg transition-colors gap-2 py-2 mt-1 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-foreground hover:text-skyhug-500 hover:bg-skyhug-50 rounded-full" onClick={() => navigate('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button variant="default" className="bg-skyhug-500 hover:bg-skyhug-600 text-white rounded-full shadow-md hover:shadow-lg transition-all" onClick={() => navigate('/signup')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-skyhug-500 hover:bg-skyhug-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <div className="flex flex-col gap-1 p-6">
              <button 
                onClick={() => navigate('/')} 
                className={`transition-colors ${location.pathname === '/' ? 'text-skyhug-500 font-medium' : 'text-foreground hover:text-skyhug-500'} text-lg py-3 px-4 rounded-lg hover:bg-skyhug-50 flex items-center gap-3`}
              >
                <Home className="h-5 w-5" />
                Landing
              </button>
              {isAuthenticated && (
                <button 
                  onClick={() => navigate('/home')} 
                  className={`transition-colors ${location.pathname === '/home' ? 'text-skyhug-500 font-medium' : 'text-foreground hover:text-skyhug-500'} text-lg py-3 px-4 rounded-lg hover:bg-skyhug-50 flex items-center gap-3`}
                >
                  <Home className="h-5 w-5" />
                  Home
                </button>
              )}
              <button 
                onClick={() => navigate('/chat')} 
                className={`transition-colors ${location.pathname === '/chat' ? 'text-skyhug-500 font-medium' : 'text-foreground hover:text-skyhug-500'} text-lg py-3 px-4 rounded-lg hover:bg-skyhug-50 flex items-center gap-3`}
              >
                <MessageSquare className="h-5 w-5" />
                Chat
              </button>
              <button 
                onClick={() => navigate('/voice')} 
                className={`transition-colors ${location.pathname === '/voice' ? 'text-skyhug-500 font-medium' : 'text-foreground hover:text-skyhug-500'} text-lg py-3 px-4 rounded-lg hover:bg-skyhug-50 flex items-center gap-3`}
              >
                <Mic className="h-5 w-5" />
                Voice
              </button>
              
              {isAuthenticated ? (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="h-10 w-10 bg-skyhug-100 rounded-full flex items-center justify-center text-skyhug-500 font-semibold">
                      {user?.name?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name || 'User'}</p>
                      <p className="text-muted-foreground text-sm">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mb-2 rounded-lg py-5 hover:bg-skyhug-50 hover:text-skyhug-500 hover:border-skyhug-200" 
                    onClick={() => navigate('/home')}
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Home
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mb-2 rounded-lg py-5 hover:bg-skyhug-50 hover:text-skyhug-500 hover:border-skyhug-200" 
                    onClick={() => navigate('/sessions')}
                  >
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Session History
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mb-2 rounded-lg py-5 hover:bg-skyhug-50 hover:text-skyhug-500 hover:border-skyhug-200" 
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg py-5 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t px-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start py-5 rounded-lg hover:bg-skyhug-50 hover:text-skyhug-500 hover:border-skyhug-200" 
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="mr-3 h-5 w-5" />
                    Login
                  </Button>
                  <Button 
                    variant="default" 
                    className="w-full justify-start py-5 rounded-lg bg-skyhug-500 hover:bg-skyhug-600 shadow-md" 
                    onClick={() => navigate('/signup')}
                  >
                    <UserPlus className="mr-3 h-5 w-5" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
