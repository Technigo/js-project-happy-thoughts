import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { View } from './View';
import { styled, keyframes } from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 30px;
`;

export const BaseHeading = styled.h1`
  color: rgb(42, 42, 42);
  text-align: center;
  font-weight: 500;
  font-family: Monospace, monospace;
  letter-spacing: 0.2px;
`;

export const Heading = styled(BaseHeading)`
  font-size: 22px;
`;

export const SubHeading = styled(BaseHeading)`
  font-size: 15px;
`;

const RedText = styled.span`
  color: #e63946;
`;

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Hourglass = styled.div`
  font-size: 45px;
  animation: ${Rotate} 1.5s linear infinite;
`;

export const Thoughts = () => {
  const [happyThoughts, setHappyThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8081/thoughts')
      .then((res) => res.json())
      .then((data) => {
        setHappyThoughts(data);
        setLoading(false);
      })

      .catch((err) => {
        console.error('Failed to fetch thoughts:', err);
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = (newThought) => {
    setHappyThoughts((prevThoughts) => [newThought, ...prevThoughts]);
  };

  const handleDeleteThought = (deletedId) => {
    setHappyThoughts((prev) => prev.filter((t) => t._id !== deletedId));
  };

  return (
    <Container>
      <DotLottieReact
        src='https://lottie.host/5a7cb486-522b-4467-b656-356bea2585ff/MH7Oyw6zWd.lottie'
        loop
        autoplay
        style={{ maxWidth: '350px' }}
      />
      <Heading>Welcome to Happy Thoughts ❤️</Heading>
      <SubHeading>
        Trying to make the world a better place,{' '}
        <RedText>one thought at a time.</RedText>
      </SubHeading>
      <Post onSubmit={handleFormSubmit} />
      {loading ? (
        <Hourglass>⏳</Hourglass>
      ) : (
        <View
          thoughts={happyThoughts}
          handleDeleteThought={handleDeleteThought}
        />
      )}
    </Container>
  );
};
