import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './Button';

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const GroupLabel = styled.span`
  font-weight: bold;
  color: ${colors.text.secondary};
  margin-right: 8px;
  font-size: 14px;
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

const FilterToggle = ({ 
  currentView, 
  onViewChange, 
  currentFilter, 
  onFilterChange 
}) => {
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
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onFilterChange(currentFilter === 'my' ? 'all' : 'my');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onViewChange, onFilterChange, currentFilter]);

  return (
    <div role="group" aria-label="View and filter controls">
      <ScreenReaderOnly>
        Keyboard shortcuts: Press P for pagination, I for infinite scroll, M to toggle my thoughts
      </ScreenReaderOnly>
      
      <ToggleContainer>
        {/* View Mode Toggle */}
        <ToggleGroup role="group" aria-label="View mode selection">
          <Button
            variant="toggle"
            onClick={() => onViewChange('pagination')}
            $active={currentView === 'pagination'}
            aria-pressed={currentView === 'pagination'}
            aria-label="Switch to pagination view (shortcut: P)"
          >
            Pagination
          </Button>
          <Button
            variant="toggle"
            onClick={() => onViewChange('infinite')}
            $active={currentView === 'infinite'}
            aria-pressed={currentView === 'infinite'}
            aria-label="Switch to infinite scroll view (shortcut: I)"
          >
            Infinite Scroll
          </Button>
        </ToggleGroup>

        {/* Thought Filter Toggle */}
        <ToggleGroup role="group" aria-label="Thought filter selection">
          <Button
            variant="toggle"
            onClick={() => onFilterChange('all')}
            $active={currentFilter === 'all'}
            aria-pressed={currentFilter === 'all'}
            aria-label="Show all thoughts"
          >
            All Thoughts
          </Button>
          <Button
            variant="toggle"
            onClick={() => onFilterChange('my')}
            $active={currentFilter === 'my'}
            aria-pressed={currentFilter === 'my'}
            aria-label="Show only my thoughts (shortcut: M)"
          >
            My Thoughts
          </Button>
        </ToggleGroup>
      </ToggleContainer>
    </div>
  );
};

export default FilterToggle; 