import React, { useState } from 'react';
import axios from 'axios';

function Moderate() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/moderate', { text });
    setResult(res.data.result);
  };

  return (
    <div className="moderate">
      <h2>Moderate Content</h2>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to moderate" />
      <button onClick={handleSubmit}>Submit</button>
      <h3>Result: {result}</h3>
    </div>
  );
}

export default Moderate;
