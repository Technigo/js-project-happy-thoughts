import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';
import { useAuth } from '../stores/authStore';
import { useFormStore } from '../stores/uiStore';
import { colors } from '../styles/colors';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { validateSignupForm, validatePassword } from '../utils/validation';

const FormContainer = styled.div`
  background: ${colors.background.light};
  box-shadow: ${colors.overlay.shadow};
  border-radius: 6px;
  border: 2px solid ${colors.border.main};
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
  color: ${colors.text.primary};
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
  border: 1px solid ${colors.border.light};
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  @media ${device.smallMobile} {
    padding: 8px;
    font-size: 0.95rem;
  }

  &:focus {
    outline: none;
    border-color: ${colors.border.focus};
  }
`;

const FieldLabel = styled.label`
  font-size: 0.9rem;
  color: ${colors.text.secondary};
  margin-bottom: 4px;
  display: block;
`;

const RequirementsContainer = styled.div`
  margin-top: 8px;
  padding: 10px;
  background: ${colors.background.requirements};
  border-radius: 4px;
  border-left: 3px solid ${colors.border.accent};
  font-size: 0.85rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  color: ${props => props.valid ? colors.state.success : colors.text.secondary};

  &::before {
    content: '${props => props.valid ? '✓' : '○'}';
    margin-right: 6px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ToggleContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ToggleText = styled.p`
  text-align: center;
  color: ${colors.text.secondary};
  font-size: 0.9rem;
  margin: 0;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: ${colors.primary.main};
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;

  &:hover {
    color: ${colors.primary.hover};
  }
`;

const SignupForm = ({ onToggleMode }) => {
  const { isLoading, signUp } = useAuth();
  const { signupForm, setSignupName, setSignupEmail, setSignupPassword, setSignupConfirmPassword, setSignupError, resetSignupForm } = useFormStore();

  const { name, email, password, confirmPassword, error } = signupForm;

  // Password requirements validation
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = name.trim() && email.trim() && allRequirementsMet && passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await signUp(name.trim(), email.trim(), password);
      resetSignupForm();
    } catch (err) {
      setSignupError(err.message);
    }
  };

  return (
    <FormContainer>
      <Title as="h2">Create Your Account</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setSignupName(e.target.value)}
            disabled={isLoading}
            required
            aria-label="Full Name"
          />
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setSignupEmail(e.target.value)}
            disabled={isLoading}
            required
            aria-label="Email address"
          />
        </div>

        <div>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setSignupPassword(e.target.value)}
            disabled={isLoading}
            required
            aria-label="Password"
          />
          
          {password && (
            <RequirementsContainer>
              <RequirementItem valid={requirements.length}>
                At least 8 characters
              </RequirementItem>
              <RequirementItem valid={requirements.uppercase}>
                One uppercase letter
              </RequirementItem>
              <RequirementItem valid={requirements.lowercase}>
                One lowercase letter
              </RequirementItem>
              <RequirementItem valid={requirements.number}>
                One number
              </RequirementItem>
              <RequirementItem valid={requirements.special}>
                One special character
              </RequirementItem>
            </RequirementsContainer>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            aria-label="Confirm password"
          />
          {confirmPassword && !passwordsMatch && (
            <div style={{ color: colors.state.error, fontSize: '0.85rem', marginTop: '4px' }}>
              Passwords do not match
            </div>
          )}
        </div>

        {error && <ErrorMessage aria-live="polite">{error}</ErrorMessage>}

        <Button type="submit" disabled={isLoading || !isFormValid} aria-label="Create Account">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Form>

      <ToggleContainer>
        <ToggleText>
          Already have an account?{' '}
          <ToggleLink type="button" onClick={onToggleMode}>
            Sign In
          </ToggleLink>
        </ToggleText>
      </ToggleContainer>
    </FormContainer>
  );
};

export default SignupForm; 