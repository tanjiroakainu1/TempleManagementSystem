import { useCallback, useEffect, useRef, useState } from 'react';
import { useDataVersion } from '@/context/DataContext';

/**
 * Load data from dataApi / localStorage. Re-fetches when `version` (global store bump) or `deps` change.
 * Loader is kept in a ref so inline `() => dataApi.foo()` does not cause infinite reload loops.
 */
export function useData<T>(loader: () => Promise<T>, deps: unknown[] = []): {
  data: T | null;
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
} {
  const version = useDataVersion();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loaderRef.current();
      setData(result);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [version, ...deps]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
