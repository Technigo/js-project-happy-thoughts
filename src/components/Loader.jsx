import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles/colors';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  margin: 40px 0;
  font-size: 1.2rem;
  color: ${colors.text.muted};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SpinnerWheel = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.border.light};
  border-top: 4px solid ${colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  text-align: center;
  transition: opacity 0.3s ease;
`;

/**
 * Enhanced loading indicator component with spinning wheel and delayed message
 */
const Loader = () => {
  const [showDelayedMessage, setShowDelayedMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedMessage(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderWrapper>
      <SpinnerWheel />
      <LoadingText>
        {showDelayedMessage 
          ? "Hold on, we're starting our services up, just for you" 
          : "Loading..."
        }
      </LoadingText>
    </LoaderWrapper>
  );
};

export default Loader; 