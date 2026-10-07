import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '../services/jobs';
import type { Job } from '../types/job';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuantity,setCurrentQuantity]=useState<number | null>(null)
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getJobs();
      setJobs(data);
      console.log(Array.isArray(data))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar empleos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobs();
        if (isMounted) {
          setJobs(data);
        }
      setCurrentQuantity(data.length)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar empleos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false; 
    };
  }, []);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
    currentQuantity
  };
}