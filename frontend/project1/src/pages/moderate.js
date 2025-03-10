import React, { useState } from 'react';
import axios from 'axios';
import './Moderate.css';

function Moderate() {
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Handle Submit Button
  const handleSubmit = async () => {
    if (text.trim() === '') {
      setError('⚠️ Please enter some text to moderate.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ✅ Send Text to Flask API
      const response = await axios.post('http://localhost:5000/moderate', {
        text: text
      });

      // ✅ Extract Response Data
      setLabel(response.data.label);
      setScore(response.data.score);

      // ✅ Clear Input Box
      setText('');
      setLoading(false);
    } catch (error) {
      console.error("❌ Error:", error);
      setError('❌ Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="moderate">
      <h2>💬 Moderate Text Content</h2>
      
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="👉 Enter text to moderate..."
        rows="5"
        style={{ width: '100%', padding: '10px' }}
      />

      <button 
        onClick={handleSubmit} 
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        {loading ? '🚀 Moderating...' : 'Submit 🚀'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          ⚠️ {error}
        </p>
      )}

      {label && (
        <div style={{ marginTop: '20px' }}>
          <h3>✅ Result:</h3>
          <p><strong>💡 Label:</strong> {label}</p>
          <p><strong>📊 Score:</strong> {score}</p>
        </div>
      )}
    </div>
  );
}

export default Moderate;
