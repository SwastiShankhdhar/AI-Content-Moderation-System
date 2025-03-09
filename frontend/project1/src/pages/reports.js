import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => setReports(res.data));
  }, []);

  return (
    <div className="reports">
      <h2>Flagged Reports</h2>
      {reports.map((report, index) => (
        <div key={index}>
          <p><b>Content:</b> {report.text}</p>
          <p><b>Status:</b> {report.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Reports;
