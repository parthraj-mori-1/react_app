import { Oval } from 'react-loader-spinner';
import React from 'react';
import S3Input from './components/S3Input';
import StatusTracker from './components/status_tracker';
import { useJobSubmission } from './Hooks/submissions';
import './styles/app.css';

function App() {
  const { jobId, error, isSubmitting, submitJob } = useJobSubmission();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Home Healthcare Referral System</h1>
      </header>

      <main className="main-content">
        {!jobId ? (
          <S3Input onSubmit={submitJob} />
        ) : (
          <StatusTracker jobId={jobId} />
        )}

        {error && (
          <div className="error-message">
            🚨 {error}
          </div>
        )}

        {isSubmitting && (
          <div className="submitting-overlay">
            <Oval color="#00BFFF" height={50} width={50} />
            <p>⏳ Sending request to process PDFs...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;