import React from 'react';

interface Props {
  onClick: () => void;
  loading: boolean;
}

const CatFactButton: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? 'Loading...' : 'Show Another Fact'}
    </button>
  );
};

export default CatFactButton;
