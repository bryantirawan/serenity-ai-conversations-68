
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PastSessionsList from '@/components/session/PastSessionsList';

const PastSessionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="bg-serenity-50 py-6 px-4 md:px-8 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Your Session History</h1>
            <p className="text-center text-muted-foreground mt-2">
              Review your therapy journey and past insights
            </p>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col bg-gradient-to-b from-white to-serenity-50 p-4 md:p-8">
          <PastSessionsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PastSessionsPage;
