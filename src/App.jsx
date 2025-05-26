import styled from 'styled-components';
import ThoughtsBoard from './containers/ThoughtsBoard';

const AppWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

export const App = () => {
  return (
    <AppWrapper>
      <LayoutWrapper>
        <ThoughtsBoard />
        <p>
          Currently under construction – soon to be powered by Technigo’s Happy
          Thoughts API!
        </p>
      </LayoutWrapper>
    </AppWrapper>
  );
};
