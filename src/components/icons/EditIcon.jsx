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
 
export const EditIcon = () => (
  <SvgWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 21h4l11.293-11.293a1 1 0 0 0 0-1.414l-2.586-2.586a1 1 0 0 0-1.414 0L4 17v4zm14.707-13.707-2.586-2.586L17 3.414l2.586 2.586-0.879 0.879z"/>
    </svg>
  </SvgWrapper>
);