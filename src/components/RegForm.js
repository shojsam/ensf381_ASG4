import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegForm.css'; // Import the CSS file

const RegForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = [];

    // Username: 3-20 characters, must start with a letter, allow letters, numbers, hyphens, underscores.
    const usernameRegex = /^[A-Za-z][A-Za-z0-9-_]{2,19}$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.push(
        'Username must be 3-20 characters, start with a letter, and can only include letters, numbers, hyphens, or underscores.'
      );
    }

    // Password: at least 8 characters, must contain uppercase, lowercase, a number, and a special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-\_=+\[\]{}|;:\'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-\_=+\[\]{}|;:\'",.<>?/`~]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.push(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
    }

    // Confirm Password: Must match the password field.
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match.');
    }

    // Email: Must be a valid email format (e.g., username@example.com) with no spaces and a valid domain (.com, .net, .io)
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.push('Please enter a valid email address (e.g., username@example.com).');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // If not using a proxy, change the URL to the back end's address.
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email
          })
        });
        const data = await response.json();
        if (response.ok) {
          // Redirect to login page on successful signup.
          navigate('/login');
        } else {
          setErrors([data.message || 'Registration failed.']);
        }
      } catch (error) {
        setErrors(['Registration failed. Please try again.']);
      }
    }
  };

  return (
    <div className="regform-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {errors.length > 0 && (
          <div className="error-box">
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegForm;
