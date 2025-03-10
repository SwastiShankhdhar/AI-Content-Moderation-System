import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);

  // Fetch reports from Flask API
  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => {
        console.log(res.data);
        setReports(res.data);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
      });
  }, []);

  return (
    <div className="reports">
      <h2>🚩 Flagged Reports</h2>
      {reports.length === 0 ? (
        <p>No reports flagged yet.</p>
      ) : (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <p><b>📜 Content:</b> {report.content}</p>
            <p><b>📊 Label:</b> {report.label}</p>
            <p><b>💯 Score:</b> {report.score}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;
