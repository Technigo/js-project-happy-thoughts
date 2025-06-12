import { useEffect } from 'react';
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

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`;

const ViewToggle = ({ currentView, onViewChange }) => {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if not focused on an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        onViewChange('pagination');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        onViewChange('infinite');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onViewChange]);

  return (
    <div role="group" aria-label="View mode selection">
      <ScreenReaderOnly>
        Keyboard shortcuts: Press P for pagination, I for infinite scroll
      </ScreenReaderOnly>
      <ToggleContainer>
        <ToggleButton 
          onClick={() => onViewChange('pagination')}
          $active={currentView === 'pagination'}
          aria-pressed={currentView === 'pagination'}
          aria-label="Switch to pagination view (shortcut: P)"
        >
          📄 Pagination
        </ToggleButton>
        <ToggleButton 
          onClick={() => onViewChange('infinite')}
          $active={currentView === 'infinite'}
          aria-pressed={currentView === 'infinite'}
          aria-label="Switch to infinite scroll view (shortcut: I)"
        >
          ∞ Infinite Scroll
        </ToggleButton>
      </ToggleContainer>
    </div>
  );
};

export default ViewToggle; 