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


export const SaveIcon = () => (
  <SvgWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm0 2v2H7V5h10zM5 19V5h2v4h10V5l2 2v12H5z"/>
    </svg>
  </SvgWrapper>
);



 