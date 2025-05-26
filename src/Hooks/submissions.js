import { useState } from 'react';
import axios from 'axios';

export const useJobSubmission = () => {
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!process.env.REACT_APP_SUBMIT_API_KEY) {
    throw new Error('Submit API key is missing');
  }

  const submitJob = async (paths) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_SUBMIT_API_URL,
        { links: paths },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.REACT_APP_SUBMIT_API_KEY
          }
        }
      );

      if (response.status === 200) {
        setJobId(response.data.job_id);
      } else {
        setError(response.data.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { jobId, error, isSubmitting, submitJob };
};