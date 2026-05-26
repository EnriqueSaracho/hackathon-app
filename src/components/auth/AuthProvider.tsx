"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthSession, SessionRole } from "@/lib/types";
import * as auth from "@/lib/auth";

type AuthContextValue = {
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => AuthSession;
  signup: (
    fullName: string,
    email: string,
    password: string,
    role: SessionRole,
  ) => AuthSession;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSession(auth.getSession());
  }, []);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const login = useCallback(
    (email: string, password: string) => {
      const s = auth.login(email, password);
      setSession(s);
      return s;
    },
    [],
  );

  const signup = useCallback(
    (fullName: string, email: string, password: string, role: SessionRole) => {
      const s = auth.signup(fullName, email, password, role);
      setSession(s);
      return s;
    },
    [],
  );

  const logout = useCallback(() => {
    auth.logout();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, login, signup, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
