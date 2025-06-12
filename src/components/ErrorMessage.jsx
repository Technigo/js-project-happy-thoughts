import styled from 'styled-components';
import { colors } from '../styles/colors';

const ErrorWrapper = styled.div`
  color: ${colors.state.error};
  margin: 20px 0;
  font-size: 1rem;
`;

/**
 * Displays error messages with consistent styling
 */
const ErrorMessage = ({ children }) => <ErrorWrapper>{children}</ErrorWrapper>;

export default ErrorMessage; 