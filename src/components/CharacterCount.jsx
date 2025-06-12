/**
 * Character count display component for text inputs
 * Shows remaining characters with error state styling
 */
import styled from "styled-components";
import { colors } from '../styles/colors';

const Count = styled.span`
  font-size: 0.9rem;
  color: ${(props) => (props.$isError ? colors.state.error : colors.text.secondary)};
`;

const CharacterCount = ({ count, isError }) => (
  <Count $isError={isError}>{count} characters remaining</Count>
);

export default CharacterCount;