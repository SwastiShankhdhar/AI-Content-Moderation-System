import React, { useState } from 'react';
import axios from 'axios';

function Moderate() {
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (text.trim() === '') {
      setError('Please enter some text to moderate.');
      return;
    }

    setError(''); // Clear previous error

    try {
      const response = await axios.post('http://localhost:5000/moderate', {
        text: text
      });

      // ✅ Extract data from response
      setLabel(response.data.label);
      setScore(response.data.score);
    } catch (error) {
      console.error("Error:", error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="moderate">
      <h2>💬 Moderate Text Content</h2>
      
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to moderate..."
        rows="5"
        style={{ width: '100%', padding: '10px' }}
      />

      <button 
        onClick={handleSubmit} 
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        🚀 Submit
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          ⚠️ {error}
        </p>
      )}

      {label && (
        <div style={{ marginTop: '20px' }}>
          <h3>📝 Result:</h3>
          <p><strong>Label:</strong> {label}</p>
          <p><strong>Score:</strong> {score}</p>
        </div>
      )}
    </div>
  );
}

export default Moderate;
