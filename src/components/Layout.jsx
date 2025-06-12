import styled from 'styled-components';
import { colors } from '../styles/colors';
import { device } from '../styles/media';

export const SkipLink = styled.a`
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 10000;
  background: ${colors.primary.main};
  color: ${colors.background.white};
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  &:focus {
    left: 16px;
    top: 16px;
    width: auto;
    height: auto;
    outline: 2px solid ${colors.primary.dark};
  }
`;

export const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`;

export const AppContainer = styled.div`
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

export const UserInfo = styled.div`
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

export const UserEmail = styled.span`
  color: ${colors.text.primary};
  font-weight: 500;
`;

export const WelcomeText = styled.span`
  color: ${colors.text.secondary};
  font-size: 0.9rem;
`; 