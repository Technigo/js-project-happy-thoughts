import { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${colors.text.muted};
  font-size: 0.9rem;
`;

const InfiniteScroll = ({ onLoadMore, hasMore, loading, children }) => {
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore, onLoadMore]);

  return (
    <>
      {children}
      <div ref={lastElementRef}>
        {loading && (
          <LoadingIndicator>
            Loading more thoughts...
          </LoadingIndicator>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll; 