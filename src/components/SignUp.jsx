import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../userService';
import styled from 'styled-components';

const Form = styled.form`
  background: white;
  border: 1px solid black;
  box-shadow: 4px 4px 0 pink;
  padding: 1rem;
  max-width: 400px;
  margin: 2rem auto;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: pink;
  color: black;
  border: 1px solid black;
  box-shadow: 4px 4px 0 black;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.875rem;
`;

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <>
      <Heading>Happy Thoughts</Heading>
      <Form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        {error && <Error>{error}</Error>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign up</Button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </Form>
    </>
  );
};
