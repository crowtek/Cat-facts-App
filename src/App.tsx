import React from 'react';
import './App.css';
import useCatFact from './hooks/useCatFact';
import CatFactDisplay from './components/CatFactDisplay';
import CatFactButton from './components/CatFactButton';

const App: React.FC = () => {
  const { catFact, loading, error, getCatFact } = useCatFact();

  return (
    <div className='app'>
      <div className='cat-fact-header'>
        <img src='/cat.png' alt='Cat' />
      </div>
      <div className='cat-fact-container'>
        <div className='cat-fact-card'>
          <h1>Random Cat Fact</h1>
          <CatFactDisplay catFact={catFact} loading={loading} error={error} />
          <CatFactButton onClick={getCatFact} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default App;
