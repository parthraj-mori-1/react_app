import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const S3Input = ({ onSubmit }) => {
  const [paths, setPaths] = useState('');

  const handleSubmit = () => {
    const cleanedPaths = paths.split('\n').map(line => line.trim()).filter(Boolean);
    if (cleanedPaths.length > 0) {
      onSubmit(cleanedPaths);
    }
  };

  return (
    <div className="input-section">
      <h2>📄 Home Healthcare Referral</h2>
      <TextField
        label="Enter S3 PDF paths (one per line)"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={paths}
        onChange={(e) => setPaths(e.target.value)}
        placeholder="s3://bucket-name/path/to/file1.pdf\ns3://bucket-name/path/to/file2.pdf"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
        disabled={paths.trim().length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default S3Input;