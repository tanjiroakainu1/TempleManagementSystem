import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { subscribeData } from '@/lib/storage/services';
import { getStore } from '@/lib/storage/db';

interface DataContextType {
  version: number;
  refresh: () => void;
  ready: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getStore();
    setReady(true);
    return subscribeData(() => setVersion((v) => v + 1));
  }, []);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  return (
    <DataContext.Provider value={{ version, refresh, ready }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataVersion(): number {
  const ctx = useContext(DataContext);
  return ctx?.version ?? 0;
}

export function useDataReady(): boolean {
  return useContext(DataContext)?.ready ?? false;
}

export function useDataRefresh(): () => void {
  return useContext(DataContext)?.refresh ?? (() => {});
}
