import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UsernameScreen() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      navigate('/app');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/app');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Choose a unique username</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Username</button>
      </form>
    </div>
  );
}

export default UsernameScreen;