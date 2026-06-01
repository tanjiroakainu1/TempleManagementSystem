import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';
import { setSessionUserId } from '@/lib/storage/services';
import { ROLES, type RoleKey } from '@/config/roles';

export interface User {
  id: number;
  role: RoleKey;
  full_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    authApi
      .me()
      .then((session) => {
        if (cancelled) return;
        if (!session?.user) {
          setSessionUserId(null);
          setUser(null);
          return;
        }
        const u = session.user;
        setUser({
          id: u.id,
          role: u.role as RoleKey,
          full_name: u.full_name,
          email: u.email,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setSessionUserId(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { user: u } = await authApi.login(email, password);
    const sessionUser: User = {
      id: u.id as number,
      role: u.role as RoleKey,
      full_name: u.full_name as string,
      email: u.email as string,
    };
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    setSessionUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getRoleFolder(role: RoleKey): string {
  return ROLES[role]?.folder ?? '';
}
