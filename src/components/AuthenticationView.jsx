import { useAppUIStore } from '../stores/uiStore';
import { AppContainer } from './Layout';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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

export default AuthenticationView; 