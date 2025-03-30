import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthContext from './AuthContext';
import DisplayStatus from './DisplayStatus';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username || !password) {
      setStatus({ type: 'error', message: 'Username and password cannot be empty.' });
      return false;
    }
    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      const user = users.find(u => u.username === username && u.email === password);
      if (user) {
        setStatus({ type: 'success', message: 'Login successful!' });
        setAuthUser(user);
        // Redirect after 2 seconds
        setTimeout(() => navigate('/courses'), 2000);
      } else {
        setStatus({ type: 'error', message: 'Invalid credentials.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div>
      <Header />
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <a href="#">Forgot Password?</a>
        </form>
        {status.message && <DisplayStatus type={status.type} message={status.message} />}
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
