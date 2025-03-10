import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';  // Import CSS file

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Fetch Reports from Backend
  useEffect(() => {
    axios.get('http://localhost:5000/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Handle Approve/Reject Action
  const handleAction = async (id, action) => {
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`http://localhost:5000/reports/${id}`, { action });

      // ✅ Update status in real-time (without refresh)
      const updatedReports = reports.map(report => {
        if (report.id === id) {
          report.status = action === 'approve' ? 'Approved' : 'Rejected';
        }
        return report;
      });

      setReports(updatedReports);
      setLoading(false);

      // ✅ Show Success Message
      setMessage(`✅ Content has been ${action === 'approve' ? 'Approved' : 'Rejected'} Successfully.`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="reports-container">
      <h2>🚩 Flagged Content Reports</h2>

      {message && (
        <p style={{ color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      {reports.length === 0 ? (
        <p>No flagged content available.</p>
      ) : (
        reports.map(report => (
          <div className="report-card" key={report.id}>
            <p className="content">{report.text}</p>
            <p><strong>📊 Label:</strong> {report.label}</p>
            <p><strong>✅ Status:</strong> {report.status}</p>

            <div className="button-container">
              <button 
                className="approve"
                disabled={loading || report.status !== 'Pending'}
                onClick={() => handleAction(report.id, 'approve')}
              >
                ✅ Approve
              </button>

              <button 
                className="reject"
                disabled={loading || report.status !== 'Pending'}
                onClick={() => handleAction(report.id, 'reject')}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;
