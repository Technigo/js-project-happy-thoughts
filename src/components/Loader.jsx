import styled from 'styled-components';
import { colors } from '../styles/colors';

const LoaderWrapper = styled.div`
  margin: 40px 0;
  font-size: 1.2rem;
  color: ${colors.text.muted};
`;

/**
 * Simple loading indicator component
 */
const Loader = () => <LoaderWrapper>Loading...</LoaderWrapper>;

export default Loader; 