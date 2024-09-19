import React from 'react';

interface Props {
  catFact: string;
  loading: boolean;
  error: string | null;
}

const CatFactDisplay: React.FC<Props> = ({ catFact, loading, error }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {!loading && !error && <p>{catFact}</p>}
    </div>
  );
};

export default CatFactDisplay;
