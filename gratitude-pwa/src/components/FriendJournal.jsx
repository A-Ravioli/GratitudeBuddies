import React, { useState, useEffect } from 'react';

function FriendJournal() {
  const [friend, setFriend] = useState('');
  const [friendEntries, setFriendEntries] = useState([]);

  useEffect(() => {
    const storedFriend = localStorage.getItem('friend');
    setFriend(storedFriend || '');
    // In a real app, you'd fetch friend's entries from a backend here
    // For now, we'll use mock data
    setFriendEntries([
      { date: '2023-05-01', content: 'Grateful for sunny weather' },
      { date: '2023-05-02', content: 'Thankful for my supportive family' },
    ]);
  }, []);

  return (
    <div>
      <h2 className="mb-3">
        {friend ? `${friend}'s Journal` : 'Add a friend to see their entries'}
      </h2>
      {friendEntries.map((entry, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{new Date(entry.date).toLocaleDateString()}</h5>
            <p className="card-text">{entry.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendJournal;