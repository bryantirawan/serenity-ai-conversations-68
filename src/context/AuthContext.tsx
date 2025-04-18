import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  patientReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [patientReady, setPatientReady] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const supaUser = session.user;
        const loadedUser = {
          id: supaUser.id,
          email: supaUser.email!,
          name: supaUser.email!.split('@')[0],
        };
        setUser(loadedUser);
        checkPatientExists(supaUser.id);
      } else {
        setUser(null);
        setPatientReady(false);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const checkPatientExists = async (userId: string) => {
    const { data, error } = await supabase
      .from('patients')
      .select('id')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setPatientReady(true);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
      if (error || !data.user) throw error;

      const supaUser = data.user;
      const newUser = {
        id: supaUser.id,
        email: supaUser.email!,
        name: supaUser.email!.split('@')[0],
      };
      setUser(newUser);

      const { error: patientError } = await supabase.from('patients').upsert(
        { id: newUser.id, full_name: newUser.name },
        { onConflict: 'id' }
      );

      if (!patientError) setPatientReady(true);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password: password.trim() });
      if (error || !data.user) throw error;

      const supaUser = data.user;
      const newUser = {
        id: supaUser.id,
        email: supaUser.email!,
        name,
      };
      setUser(newUser);

      const { error: patientError } = await supabase.from('patients').upsert(
        { id: newUser.id, full_name: name },
        { onConflict: 'id' }
      );

      if (!patientError) setPatientReady(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPatientReady(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        patientReady,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
