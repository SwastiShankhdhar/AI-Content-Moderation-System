import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => setReports(res.data));
  }, []);

  const handleAction = (id, action) => {
    axios.post(`http://localhost:5000/reports/${id}`, { action })
      .then(() => window.location.reload());
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      {reports.map((report) => (
        <div key={report.id}>
          <p><b>Content:</b> {report.text}</p>
          <p><b>Status:</b> {report.status}</p>
          <button onClick={() => handleAction(report.id, 'approve')}>Approve</button>
          <button onClick={() => handleAction(report.id, 'reject')}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
