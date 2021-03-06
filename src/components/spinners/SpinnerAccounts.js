import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const SpinnerAccounts = () => {
  return (
    <CircularProgress
      size={25}
      style={{
        position: 'absolute',
        top: '50px',
        left: '0',
      }}
    />
  );
};

export default SpinnerAccounts;

