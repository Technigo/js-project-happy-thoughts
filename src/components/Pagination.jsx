import styled from 'styled-components';
import { colors } from '../styles/colors';
import Button from './Button';

const PaginationContainer = styled.div`
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

const PageButton = styled(Button)`
  min-width: 45px;
  padding: 10px 15px;
  font-size: 1.1rem;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

  return (
    <PaginationContainer>
      <PageButton 
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
      >
        ←
      </PageButton>
      
      <PageInfo>
        <PageNumber>Page {currentPage}</PageNumber>
        <span>of</span>
        <PageNumber>{totalPages}</PageNumber>
      </PageInfo>
      
      <PageButton 
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
      >
        →
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination; 