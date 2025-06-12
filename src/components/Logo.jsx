import styled from "styled-components";

const StyledImage = styled.img`
  width: 150px;
  margin: 60px auto 10px;
  display: block;
`;

export const Logo = () => {
  return <StyledImage src="/happy-thoughts.png" alt="Happy face" />;
};