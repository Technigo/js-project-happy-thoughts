import { useEffect } from 'react';
import { useAuth } from '../stores/authStore';
import { useThoughts } from '../stores/thoughtsStore';
import { SkipLink, VisuallyHidden, AppContainer, UserInfo, UserEmail, WelcomeText } from './Layout';
import HappyThoughtForm from './HappyThoughtForm';
import ThoughtList from './ThoughtList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import HeroSection from './HeroSection';
import Button from './Button';
import FilterToggle from './FilterToggle';
import InfiniteScroll from './InfiniteScroll';
import Pagination from './Pagination';

const AuthenticatedApp = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { 
    thoughts, 
    loading, 
    error, 
    currentPage,
    totalPages,
    hasMore,
    viewMode,
    thoughtFilter,
    addThought, 
    handleLike, 
    updateThought, 
    deleteThought, 
    fetchThoughts,
    changePage,
    loadMore,
    setViewMode,
    setThoughtFilter
  } = useThoughts();

  // Initialize thoughts when component mounts
  useEffect(() => {
    fetchThoughts();
  }, [fetchThoughts]);

  const firstName = user?.displayName || user?.name?.split(' ')[0] || user?.name;

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {loading && 'Loading...'}
        {error && !loading && error}
      </VisuallyHidden>
      <AppContainer as="main" id="main-content" role="main">
        <HeroSection />
        
        <UserInfo>
          <WelcomeText>Welcome back,</WelcomeText>
          <UserEmail>{firstName}</UserEmail>
          <Button onClick={logout} disabled={authLoading}>
            {authLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </UserInfo>

        <HappyThoughtForm onSubmit={addThought} loading={loading || authLoading} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {(loading || authLoading) && <Loader />}
        
        <FilterToggle 
          currentView={viewMode} 
          onViewChange={setViewMode}
          currentFilter={thoughtFilter}
          onFilterChange={setThoughtFilter}
        />

        {viewMode === 'pagination' ? (
          <>
            <ThoughtList 
              thoughts={thoughts} 
              onLike={handleLike}
              currentUser={user}
              onUpdate={updateThought}
              onDelete={deleteThought}
              loading={loading}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              isLoading={loading}
            />
          </>
        ) : (
          <InfiniteScroll
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          >
            <ThoughtList 
              thoughts={thoughts} 
              onLike={handleLike}
              currentUser={user}
              onUpdate={updateThought}
              onDelete={deleteThought}
              loading={loading}
            />
          </InfiniteScroll>
        )}
      </AppContainer>
    </>
  );
};

export default AuthenticatedApp; 