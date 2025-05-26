import React from 'react';

const ResultDisplay = ({ data }) => {
  return (
    <div className="result-display">
      <h3>Please find the output requested as follows:</h3>
      <div className="json-results">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ResultDisplay;