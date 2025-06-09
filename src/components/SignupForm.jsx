import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';
import { useAuth } from '../contexts/AuthContext.jsx';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { validateSignupForm, validatePassword } from '../utils/validation';

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

const PasswordRequirements = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin: -10px 0 5px 0;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 3px solid #ddd;
`;

const RequirementItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'valid',
})`
  color: ${props => props.valid ? '#4CAF50' : '#666'};
  margin: 2px 0;
  
  &:before {
    content: '${props => props.valid ? '✓' : '•'}';
    margin-right: 5px;
    font-weight: bold;
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

const SignupForm = ({ onToggleMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();

  const { checks: passwordChecks } = validatePassword(password);
  const { isValid: isFormValid } = validateSignupForm(name, email, password, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isFormValid) {
      setError('Please fill in all fields correctly and ensure passwords match');
      return;
    }

    try {
      const result = await signup(name, email, password);
      if (!result.success) {
        setError(result.details || result.error || 'Signup failed');
      }
    } catch {
      setError('An unexpected error occurred');
    }
  };

  return (
    <FormContainer>
      <Title>Join the Happy Community!</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={loading}
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          disabled={loading}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
        />
        {password && (
          <PasswordRequirements>
            <RequirementItem valid={passwordChecks.length}>
              At least 6 characters
            </RequirementItem>
            <RequirementItem valid={passwordChecks.uppercase}>
              One uppercase letter (A-Z)
            </RequirementItem>
            <RequirementItem valid={passwordChecks.lowercase}>
              One lowercase letter (a-z)
            </RequirementItem>
            <RequirementItem valid={passwordChecks.number}>
              One number (0-9)
            </RequirementItem>
          </PasswordRequirements>
        )}
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          disabled={loading}
        />
        <ButtonContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading || !isFormValid}>
            {loading ? 'Creating account...' : '❤️ Sign Up ❤️'}
          </Button>
          <ToggleText>
            Already have an account?{' '}
            <ToggleLink type="button" onClick={onToggleMode} disabled={loading}>
              Log in here
            </ToggleLink>
          </ToggleText>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default SignupForm; 