import styled from "styled-components";
import { HiHeart } from "react-icons/hi";

export const HeartIcon = styled(HiHeart)`
  color: red;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
