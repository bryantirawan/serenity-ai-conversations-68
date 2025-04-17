
import React from 'react';
import SessionSchedule from '@/components/session/SessionSchedule';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SessionSchedulePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <SessionSchedule />
      </main>
      <Footer />
    </div>
  );
};

export default SessionSchedulePage;
