// src/hooks/useCatFact.ts
import { useState, useEffect } from 'react';
import { fetchCatFact, CatFact } from '../services/catFactService';

const useCatFact = () => {
  const [catFact, setCatFact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCatFact = async () => {
    setLoading(true);
    setError(null);

    try {
      const data: CatFact = await fetchCatFact();
      setCatFact(data.fact);
    } catch (error) {
      setError('Failed to load cat fact.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCatFact(); // Fetch cat fact on mount
  }, []);

  return { catFact, loading, error, getCatFact };
};

export default useCatFact;
