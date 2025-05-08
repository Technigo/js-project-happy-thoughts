import styled from "styled-components"

export const LoaderWrapper = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 100px;
  align-self: center;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`
