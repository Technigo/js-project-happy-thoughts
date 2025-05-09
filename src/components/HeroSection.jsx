import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  margin: 2rem 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }

  @media (max-width: 320px) {
    font-size: 2.5rem;
  }
`;

const HeroSection = () => <Title>Happier Tweets</Title>;

export default HeroSection;
