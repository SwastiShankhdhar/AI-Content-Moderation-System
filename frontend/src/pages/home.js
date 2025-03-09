import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>AI Content Moderation System</h1>
      <p>Detect offensive or copyrighted content using AI.</p>
      <div className="btn-group">
        <Link to="/moderate">
          <button>Moderate Content</button>
        </Link>
        <Link to="/reports">
          <button>View Reports</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
