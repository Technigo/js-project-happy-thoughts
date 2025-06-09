import styled from 'styled-components';

const LoaderWrapper = styled.div`
  margin: 40px 0;
  font-size: 1.2rem;
  color: #888;
`;

/**
 * Simple loading indicator component
 */
const Loader = () => <LoaderWrapper>Loading...</LoaderWrapper>;

export default Loader; 