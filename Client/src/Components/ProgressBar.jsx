import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = () => {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: 50,
    margin: 5,
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: progress === 100 ? '#4caf50' : '#2196f3',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.3s ease-in-out',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
