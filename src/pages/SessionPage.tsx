
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTherapist } from '@/context/TherapistContext';
import SessionIntro from '@/components/session/SessionIntro';
import SessionRoom from '@/components/session/SessionRoom';

const SessionPage = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const { clearMessages } = useTherapist();
  const navigate = useNavigate();

  useEffect(() => {
    clearMessages();
  }, []);

  const handleStartSession = () => {
    setIsSessionStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      {!isSessionStarted ? (
        <SessionIntro onStartSession={handleStartSession} />
      ) : (
        <SessionRoom />
      )}
    </div>
  );
};

export default SessionPage;
