/*import React from 'react';
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

export default Home;*/
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>AI Content Moderation System</h1>
            <p>
                Our system uses AI to detect and remove inappropriate, harmful, or copyrighted content 
                from your platform in real-time.
            </p>

            <div className="card">
                <h3>Ready to Moderate?</h3>
                <p>Navigate to the moderation panel to start moderating content.</p>
                <button onClick={() => navigate('/moderate')}>Go to Moderation</button>
            </div>

            <div className="card">
                <h3>View Reports</h3>
                <p>Check out flagged content reports and take necessary actions.</p>
                <button onClick={() => navigate('/reports')}>View Reports</button>
            </div>
        </div>
    );
}

export default Home;

