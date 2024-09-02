import { useState, useEffect } from 'react';

function Friend() {
  const [friendUsername, setFriendUsername] = useState('');
  const [currentFriend, setCurrentFriend] = useState('');

  useEffect(() => {
    const friend = localStorage.getItem('friend');
    if (friend) {
      setCurrentFriend(friend);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (friendUsername.trim()) {
      localStorage.setItem('friend', friendUsername);
      setCurrentFriend(friendUsername);
      setFriendUsername('');
      alert(`${friendUsername} added as your gratitude partner!`);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Add Gratitude Partner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
            placeholder="Enter friend's username"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Friend</button>
      </form>
      {currentFriend && (
        <div className="mt-3">
          <p>Current partner: {currentFriend}</p>
        </div>
      )}
    </div>
  );
}

export default Friend;