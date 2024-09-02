// src/components/TodayJournal.jsx
import { useState } from 'react';

function TodayJournal() {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      const date = new Date().toISOString();
      const newEntry = {
        date,
        content: entry.split('\n').map(line => `- ${line.trim()}`).join('\n') // Convert each line to a bullet point
      };
      const storedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      const updatedEntries = [...storedEntries, newEntry];
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setEntry('');
      alert('Entry saved!');
    }
  };

  return (
    <div>
      <h2 className="mb-3">Today&rsquo;s Gratitude</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your notes, each on a new line..."
            rows="6"
            required
            style={{ resize: 'none' }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Entry</button>
      </form>
    </div>
  );
}

export default TodayJournal;
