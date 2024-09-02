// src/components/TodayJournal.jsx
import { useState } from 'react';

function TodayJournal() {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      const date = new Date().toISOString();
      const newEntry = { date, content: entry };
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
            placeholder="What are you grateful for today?"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Entry</button>
      </form>
    </div>
  );
}

export default TodayJournal;
