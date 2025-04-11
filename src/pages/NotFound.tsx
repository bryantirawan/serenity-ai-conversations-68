
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="h-24 w-24 bg-serenity-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-serenity-500">?</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-serenity-500 hover:bg-serenity-600 text-white rounded-full px-6"
          >
            Return Home
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
