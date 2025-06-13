import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './Button';

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 30px 0;
  padding: 15px;
  background: ${colors.background.light};
  border-radius: 8px;
  box-shadow: ${colors.overlay.shadow};
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${colors.text.secondary};
  font-size: 1rem;
`;

const PageNumber = styled.span`
  color: ${colors.text.primary};
  font-weight: bold;
  font-size: 1.1rem;
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

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  // Keyboard shortcuts for pagination
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if not focused on an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isLoading]);

  return (
    <PaginationContainer 
      role="navigation" 
      aria-label={`Pagination navigation, page ${currentPage} of ${totalPages}`}
    >
      <ScreenReaderOnly>
        Keyboard shortcuts: Alt+Left/PageUp for previous, Alt+Right/PageDown for next page
      </ScreenReaderOnly>
      
      <Button
        variant="page"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        aria-label={`Go to previous page (page ${currentPage - 1})`}
      >
        ←
      </Button>
      
      <PageInfo role="status" aria-live="polite">
        <PageNumber>Page {currentPage}</PageNumber>
        <span>of</span>
        <PageNumber>{totalPages}</PageNumber>
      </PageInfo>
      
      <Button
        variant="page"
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        aria-label={`Go to next page (page ${currentPage + 1})`}
      >
        →
      </Button>
    </PaginationContainer>
  );
};

export default Pagination; 