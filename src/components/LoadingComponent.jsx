import styled, { keyframes } from "styled-components";

const dotAnimation = keyframes`
 0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  `;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  animation: ${dotAnimation} 1.2s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

export const LoadingComponent = () => {
  return (
    <DotContainer>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </DotContainer>
  );
};
