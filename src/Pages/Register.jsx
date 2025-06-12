import { useState } from 'react';
import { Title, Button } from '../Sections/Post';
import { Container } from '../Sections/Thoughts';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Registration successful!');
        // Optionally: Save token to localStorage, navigate to /login or /profile
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <Container>
      <DotLottieReact
        src='https://lottie.host/5a7cb486-522b-4467-b656-356bea2585ff/MH7Oyw6zWd.lottie'
        loop
        autoplay
        style={{ maxWidth: '350px' }}
      />

      <h3
        style={{
          color: '#7b2ff2',
          fontWeight: 700,
          fontSize: '1.5rem',
          marginBottom: '0.5rem',
        }}
      >
        Register
      </h3>

      <div
        style={{
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2rem 2.5rem',
          maxWidth: '340px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem',
        }}
      >
        <div style={{ width: '100%' }}>
          <label
            style={{
              fontWeight: 600,
              color: '#7b2ff2',
              fontSize: '1.1rem',
            }}
          >
            Username:
            <input
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                margin: '0.4rem 0 1rem 0',
                borderRadius: '10px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                background: '#f9f6ff',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            style={{
              fontWeight: 600,
              color: '#7b2ff2',
              fontSize: '1.1rem',
            }}
          >
            Password:
            <input
              type='password'
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                margin: '0.4rem 0 1rem 0',
                borderRadius: '10px',
                border: '1.5px solid #e0e0e0',
                fontSize: '1rem',
                background: '#f9f6ff',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div style={{ width: '100%' }}>
          <Button
            style={{
              width: '100%',
              background: '#7A2FF2',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '10px',
              padding: '0.7rem 0',
              border: 'none',
              boxShadow: '0 2px 8px rgba(123,47,242,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onClick={() => handleRegister(username, password)}
          >
            Register
          </Button>
        </div>
        {message && (
          <div
            style={{
              marginTop: '0.5rem',
              color: message.includes('successful') ? '#2ecc40' : '#f357a8',
              fontWeight: 600,
              fontSize: '1rem',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </Container>
  );
};
