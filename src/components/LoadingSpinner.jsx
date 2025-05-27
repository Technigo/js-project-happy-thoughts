import styled, { keyframes } from "styled-components";

const HeartBeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 9999;
`;

// Style the heart SVG
const HeartSpinner = styled.svg`
  width: 200px;
  height: 200px;
  animation: ${HeartBeat} 1s infinite ease-in-out;
  fill: lightpink;
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <HeartSpinner
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 130"
      aria-label="Loading spinner"
    >
      <path d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z" />
    </HeartSpinner>
    <p style={{ fontSize: "1rem", color: "black" }}>
      Loading Some Lovely Thoughts...
    </p>
  </SpinnerContainer>
);

export default LoadingSpinner;
