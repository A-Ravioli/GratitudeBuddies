// src/components/PersonalHistory.jsx
import { useState, useEffect } from 'react';

function PersonalHistory() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = () => {
      const storedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      setEntries(storedEntries);
    };
    fetchEntries();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Your Journal Entries</h2>
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{new Date(entry.date).toLocaleDateString()}</h5>
              <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }}>{entry.content}</pre>
            </div>
          </div>
        ))
      ) : (
        <p>No journal entries yet.</p>
      )}
    </div>
  );
}

export default PersonalHistory;
