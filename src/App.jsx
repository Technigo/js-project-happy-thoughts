import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HappyThoughtForm from './components/HappyThoughtForm';
import ThoughtList from './components/ThoughtList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import HeroSection from './components/HeroSection';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Button from './components/Button';
import GlobalStyle from './styles/GlobalStyles';
import { device } from './styles/media';
import { useAuth } from './stores/authStore';
import { useThoughts } from './stores/thoughtsStore';
import { useAppUIStore } from './stores/uiStore';


const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  @media ${device.tablet} {
    padding: 15px;
  }

  @media ${device.mobile} {
    padding: 10px;
  }

  @media ${device.smallMobile} {
    padding: 8px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const UserEmail = styled.span`
  color: #333;
  font-weight: 500;
`;

const WelcomeText = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AuthenticatedApp = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { thoughts, loading, error, addThought, handleLike, updateThought, deleteThought, fetchThoughts } = useThoughts();

  // Initialize thoughts when component mounts (replaces the useEffect from the original hook)
  useEffect(() => {
    fetchThoughts();
  }, [fetchThoughts]);

  const firstName = user?.displayName || user?.name?.split(' ')[0] || user?.name;

  return (
    <AppContainer>
      <HeroSection />
      
      <UserInfo>
        <WelcomeText>Welcome back,</WelcomeText>
        <UserEmail>{firstName}</UserEmail>
        <Button onClick={logout} disabled={authLoading}>
          {authLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </UserInfo>

      <HappyThoughtForm onSubmit={addThought} loading={loading || authLoading} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {(loading || authLoading) && <Loader />}
      <ThoughtList 
        thoughts={thoughts} 
        onLike={handleLike}
        currentUser={user}
        onUpdate={updateThought}
        onDelete={deleteThought}
      />
    </AppContainer>
  );
};

const AuthenticationView = () => {
  const { isLoginMode, setLoginMode, setSignupMode } = useAppUIStore();

  return (
    <AppContainer>
      <HeroSection />
      {isLoginMode ? (
        <LoginForm onToggleMode={setSignupMode} />
      ) : (
        <SignupForm onToggleMode={setLoginMode} />
      )}
    </AppContainer>
  );
};

const AppContent = () => {
  const { isAuthenticated, initializeAuth, loading: authLoading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize authentication when app loads
  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    
    initAuth();
  }, [initializeAuth]);

  // Show loading spinner while initializing
  if (!isInitialized || authLoading) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <HeroSection />
          <Loader />
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      {isAuthenticated ? <AuthenticatedApp /> : <AuthenticationView />}
    </>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
