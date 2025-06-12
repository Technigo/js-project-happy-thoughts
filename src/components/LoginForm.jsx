import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';
import { useAuth } from '../stores/authStore';
import { useFormStore } from '../stores/uiStore';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { validateLoginForm } from '../utils/validation';

const FormContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: 2px solid #bbb;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;

  @media ${device.mobile} {
    padding: 15px;
  }

  @media ${device.smallMobile} {
    padding: 12px;
  }
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
  text-align: center;

  @media ${device.smallMobile} {
    font-size: 1.1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  @media ${device.smallMobile} {
    padding: 8px;
    font-size: 0.95rem;
  }

  &:focus {
    outline: none;
    border-color: #ff4d4d;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ToggleText = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;

  &:hover {
    color: #ff3333;
  }
`;

const LoginForm = ({ onToggleMode }) => {
  const { loginForm, setLoginField, setLoginError, resetLoginForm } = useFormStore();
  const { login, loading } = useAuth();

  const { email, password, error } = loginForm;
  const isFormValid = validateLoginForm(email, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!isFormValid) {
      setLoginError('Please enter a valid email and password');
      return;
    }

    try {
      const result = await login(email, password);
      if (!result.success) {
        setLoginError(result.details || result.error || 'Login failed');
      } else {
        // Clear form on successful login
        resetLoginForm();
      }
    } catch {
      setLoginError('An unexpected error occurred');
    }
  };

  return (
    <FormContainer>
      <Title>Welcome Back!</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setLoginField('email', e.target.value)}
          placeholder="Email address"
          required
          disabled={loading}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setLoginField('password', e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
        />
        <ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading || !isFormValid}>
            {loading ? 'Logging in...' : '❤️ Log In ❤️'}
          </Button>
          <ToggleText>
            Don't have an account?{' '}
            <ToggleLink type="button" onClick={onToggleMode} disabled={loading}>
              Sign up here
            </ToggleLink>
          </ToggleText>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default LoginForm; 