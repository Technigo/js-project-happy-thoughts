import styled from 'styled-components';

const SvgWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

export const HappyFaceIcon = () => (
  <SvgWrapper>
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#f0aeae" stroke="#333" strokeWidth="4"/>
      <circle cx="45" cy="50" r="5" fill="#333"/>
      <circle cx="75" cy="50" r="5" fill="#333"/>
      <path d="M 45 75 Q 60 90, 75 75" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  </SvgWrapper>
);


