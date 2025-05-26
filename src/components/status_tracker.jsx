import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import ResultDisplay from './ResultDisplay';

const StatusTracker = ({ jobId }) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  if (!process.env.REACT_APP_STATUS_API_KEY) {
    throw new Error('Status API key is missing');
  }

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_STATUS_API_URL,
          { job_id: jobId },
          {
            headers: {
              'X-API-Key': process.env.REACT_APP_STATUS_API_KEY
            }
          }
        );

        if (response.status === 200) {
          setStatus(response.data);
        } else if (response.status === 202) {
          setAttempt(prev => prev + 1);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    if (jobId && attempt < 6) {
      const delay = attempt === 0 ? 6000 : 15000;
      const timer = setTimeout(checkStatus, delay);
      return () => clearTimeout(timer);
    }
  }, [attempt, jobId]);

  return (
    <div className="status-section">
      {error && <div className="error-message">❌ Error: {error}</div>}
      
      {!status && attempt < 6 && (
        <div className="loading">
          <Oval color="#00BFFF" height={30} width={30} />
          <p>⏳ Checking job status... Attempt {attempt + 1}/6</p>
        </div>
      )}

      {status?.responses && <ResultDisplay data={status} />}

      {attempt >= 6 && (
        <div className="warning-message">
          ⚠️ Job still in progress. Please check again later.
        </div>
      )}
    </div>
  );
};

export default StatusTracker;