import React, { useEffect, useState } from 'react';
import './App.css';

interface CatFact {
  fact: string;
  length: number;
}

const App: React.FC = () => {
  const [catFact, setCatFact] = useState<string>('');

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data: CatFact = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
      setCatFact('Failed to load cat fact.');
    }
  };

  // Fetch cat fact on component mount
  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className='app'>
      <div className='cat-fact-header'>
        <img src='/cat.png' alt='Cat' />
      </div>
      <div className='cat-fact-container'>
        <div className='cat-fact-card'>
          <h1>Random Cat Fact</h1>
          <p>{catFact}</p>
          <button onClick={fetchCatFact}>Show Another Fact</button>
        </div>
      </div>
    </div>
  );
};

export default App;
