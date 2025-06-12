import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';
import { colors } from '../styles/colors';

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.text.primary};
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;

  @media ${device.tablet} {
    font-size: 4.5rem;
  }

  @media ${device.mobile} {
    font-size: 3.5rem;
  }

  @media ${device.smallMobile} {
    font-size: 2.8rem;
  }
`;

const HeroSection = () => (
  <section aria-label="Happy Thoughts Hero">
    <Title>Happy Tweets</Title>
    {/* ...rest of the hero content... */}
  </section>
);

export default HeroSection;
