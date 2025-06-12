import { useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles/colors';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  width: 100%;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 4px solid ${colors.border.light};
  border-top: 4px solid ${colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-right: 16px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.text.muted};
  font-size: 1rem;
  font-weight: 500;
`;

const EndMessage = styled.div`
  text-align: center;
  color: ${colors.text.secondary};
  font-size: 1rem;
  padding: 20px 0 10px 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${colors.state.error};
  font-size: 1rem;
  padding: 20px 0 10px 0;
`;

const RetryButton = styled.button`
  background: ${colors.primary.main};
  color: ${colors.background.white};
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    background: ${colors.primary.hover};
  }
`;

// Simple debounce implementation
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const InfiniteScroll = ({
  onLoadMore,
  hasMore,
  loading,
  children,
  error,
  onRetry,
  restoreScroll = false,
  onSaveScroll = null
}) => {
  const observer = useRef();
  const debouncedLoadMore = useRef(debounce(onLoadMore, 200));
  const lastElementRef = useCallback(node => {
    if (loading || error) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        debouncedLoadMore.current();
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore, onLoadMore, error]);

  // Scroll position restoration
  useEffect(() => {
    if (restoreScroll) {
      const y = Number(localStorage.getItem('infiniteScrollY'));
      if (y && !isNaN(y)) {
        window.scrollTo(0, y);
      }
    }
    return () => {
      if (onSaveScroll) {
        onSaveScroll(window.scrollY);
      } else {
        localStorage.setItem('infiniteScrollY', window.scrollY);
      }
    };
  }, [restoreScroll, onSaveScroll]);

  return (
    <>
      {children}
      <LoadingContainer ref={lastElementRef}>
        {loading && (
          <LoadingIndicator>
            <Spinner />
            Loading more thoughts...
          </LoadingIndicator>
        )}
        {!loading && !hasMore && !error && (
          <EndMessage>You've reached the end!</EndMessage>
        )}
        {error && (
          <ErrorMessage>
            {error}
            {onRetry && (
              <RetryButton onClick={onRetry}>Retry</RetryButton>
            )}
          </ErrorMessage>
        )}
      </LoadingContainer>
    </>
  );
};

export default InfiniteScroll; 