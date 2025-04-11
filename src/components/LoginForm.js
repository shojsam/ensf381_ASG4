import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check against the external API (jsonplaceholder)
      const externalResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const externalUsers = await externalResponse.json();
      // For demonstration: compare username and email (using password field as email)
      const validExternalUser = externalUsers.find(
        (u) =>
          u.username.toLowerCase() === username.trim().toLowerCase() &&
          u.email.toLowerCase() === password.trim().toLowerCase()
      );

      // Check against your Flask back end
      const backendResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const backendData = await backendResponse.json();

      // If either validation succeeds, consider the login successful.
      if (validExternalUser || backendResponse.ok) {
        // You can choose to prioritize backend data or external data.
        // Here, we use backendData if available; otherwise, use validExternalUser.
        const userData = backendResponse.ok ? backendData : validExternalUser;
        login(userData);
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/courses');
        }, 2000);
      } else {
        setError('Invalid username or password!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {error && (
        <div
          style={{
            color: '#D32F2F',
            backgroundColor: '#FFEBEE',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}
        >
          {error}
        </div>
      )}

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isLoading ? '#BDBDBD' : '#004080',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
