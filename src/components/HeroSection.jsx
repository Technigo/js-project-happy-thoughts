import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';

const Title = styled.h1`
  font-size: 2.2rem;
  color: #ff4d4d;
  margin-bottom: 10px;
  text-align: center;

  @media ${device.tablet} {
    font-size: 4rem;
  }

  @media ${device.mobile} {
    font-size: 3rem;
  }

  @media ${device.smallMobile} {
    font-size: 2.5rem;
  }
`;

const HeroSection = () => (
  <section aria-label="Happy Thoughts Hero">
    <Title>Happy Thoughts</Title>
    {/* ...rest of the hero content... */}
  </section>
);

export default HeroSection;
