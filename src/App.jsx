import { useState, useEffect } from 'react';
import { useAuth } from './stores/authStore';
import { useConfirmDialogStore } from './stores/uiStore';
import { AppContainer } from './components/Layout';
import AuthenticatedApp from './components/AuthenticatedApp';
import AuthenticationView from './components/AuthenticationView';
import HeroSection from './components/HeroSection';
import Loader from './components/Loader';
import ConfirmDialog from './components/ConfirmDialog';
import GlobalStyle from './styles/GlobalStyles';

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
