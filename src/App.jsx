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
import ConfirmDialog from './components/ConfirmDialog';
import GlobalStyle from './styles/GlobalStyles';
import { colors } from './styles/colors';
import { device } from './styles/media';
import { useAuth } from './stores/authStore';
import { useThoughts } from './stores/thoughtsStore';
import { useAppUIStore, useConfirmDialogStore } from './stores/uiStore';
import ViewToggle from './components/ViewToggle';
import InfiniteScroll from './components/InfiniteScroll';
import Pagination from './components/Pagination';


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
  background: ${colors.background.userInfo};
  border-radius: 8px;
  border: 1px solid ${colors.border.light};

  @media ${device.mobile} {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const UserEmail = styled.span`
  color: ${colors.text.primary};
  font-weight: 500;
`;

const WelcomeText = styled.span`
  color: ${colors.text.secondary};
  font-size: 0.9rem;
`;

const AuthenticatedApp = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { 
    thoughts, 
    loading, 
    error, 
    currentPage,
    totalPages,
    hasMore,
    viewMode,
    addThought, 
    handleLike, 
    updateThought, 
    deleteThought, 
    fetchThoughts,
    changePage,
    loadMore,
    setViewMode
  } = useThoughts();

  // Initialize thoughts when component mounts
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
      
      <ViewToggle 
        currentView={viewMode} 
        onViewChange={setViewMode} 
      />

      {viewMode === 'pagination' ? (
        <>
          <ThoughtList 
            thoughts={thoughts} 
            onLike={handleLike}
            currentUser={user}
            onUpdate={updateThought}
            onDelete={deleteThought}
            loading={loading}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
            isLoading={loading}
          />
        </>
      ) : (
        <InfiniteScroll
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        >
          <ThoughtList 
            thoughts={thoughts} 
            onLike={handleLike}
            currentUser={user}
            onUpdate={updateThought}
            onDelete={deleteThought}
            loading={loading}
          />
        </InfiniteScroll>
      )}
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
  const confirmDialog = useConfirmDialogStore();
  
  return (
    <>
      <AppContent />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
        isLoading={confirmDialog.isLoading}
      />
    </>
  );
};

export default App;
