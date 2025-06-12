import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './Button';

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const ToggleButton = styled(Button)`
  background: ${props => props.$active ? colors.primary.main : colors.background.light};
  color: ${props => props.$active ? colors.background.white : colors.text.primary};
  border: 1px solid ${colors.border.main};
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? colors.primary.hover : colors.background.light};
  }
`;

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <ToggleContainer>
      <ToggleButton 
        onClick={() => onViewChange('pagination')}
        $active={currentView === 'pagination'}
      >
        📄 Pagination
      </ToggleButton>
      <ToggleButton 
        onClick={() => onViewChange('infinite')}
        $active={currentView === 'infinite'}
      >
        ∞ Infinite Scroll
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ViewToggle; 