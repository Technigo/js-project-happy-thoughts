import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  margin: 2rem 0;
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

const HeroSection = () => <Title>Happier Tweets</Title>;

export default HeroSection;
