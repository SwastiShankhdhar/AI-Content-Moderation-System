import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';  // Import CSS file

function Reports() {
  const [reports, setReports] = useState([]);

  // Fetch Reports from Backend
  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle Approve/Reject Action
  const handleAction = (id, action) => {
    axios.post(`http://localhost:5000/reports/${id}`, { action })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="reports-container">
      <h2>🚩 Flagged Content</h2>
      {reports.map(report => (
        <div className="report-card" key={report.id}>
          <p className="content">{report.text}</p>
          <p><strong>Label:</strong> {report.label}</p>
          <p><strong>Status:</strong> {report.status}</p>
          <div className="button-container">
            <button className="approve" onClick={() => handleAction(report.id, 'approve')}>
              ✅ Approve
            </button>
            <button className="reject" onClick={() => handleAction(report.id, 'reject')}>
              ❌ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reports;
