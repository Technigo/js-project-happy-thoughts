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

export const DeleteIcon = () => (
  <SvgWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">      
      <path d="M9 3V4H4V6H5V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V6H20V4H15V3H9zM7 6H17V19H7V6z"/>
    </svg>
  </SvgWrapper>
);

