import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 20px;
  background-color: #f2f0f0;
  outline: 2px solid #000;
  box-shadow: 8px 8px 0px #000;
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 16px;
  color: #000;
  font-weight: 500;
  font-family: Roboto, sans-serif;
  letter-spacing: 0.2px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin: 5px;
`;

const ProgressCircle = styled.svg`
  transform: rotate(0deg);
`;

const CircleText = styled.text`
  font-size: 12px;
  fill: ${({ color }) => color};
  text-anchor: middle;
  dominant-baseline: central;
`;

export const InputArea = styled.textarea`
  width: 90%;
  border: 2px solid #7a7b7b;
  padding: 10px;
  font-size: 16px;
  resize: none;

  &:focus {
    outline: none;
    color: #000;
    border-color: #7a7b7b;
    box-shadow: 0 0 5px #7a7b7b;
  }
  &::placeholder {
    font-size: 13px;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #fdafaf;
  color: #000;
  font-weight: 600;
  border: none;
  padding: 7px 14px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  font-family: Roboto, sans-serif;
  letter-spacing: 0.2px;
  margin: 15px 5px 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
  &:disabled {
    background-color: rgba(253, 175, 175, 0.47);
    cursor: default;
  }
  &:hover {
    transform: scale(1);
  }
`;

const PostAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
    50% {
    transform: scale(1.5);
    opacity: 1;
    }
  100% {
    transform: scale(2); 
    opacity: 0;
  }
`;

const PostAnimationContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
`;

const Animation = styled.span`
  font-size: 45px;
  animation: ${PostAnimation} 3s ease-out forwards;
`;

export const Post = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const maxLength = 140;
  const charCount = inputValue.length;
  const charsLeft = maxLength - charCount;

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setError(value.length > maxLength ? 'Your thought is too long.' : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      inputValue.trim() &&
      inputValue.length >= 1 &&
      inputValue.length <= maxLength
    ) {
      try {
        const response = await fetch('http://localhost:8081/thoughts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputValue }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to post your thought.');
          return;
        }

        const newThought = await response.json();
        onSubmit(newThought);
        setInputValue('');
        setError('');

        // When submitting - show animation for 3 seconds
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
      } catch (err) {
        setError('Something went wrong. Please try again.', err);
      }
    } else {
      setError('Your thought must be between 5 and 140 characters.');
    }
  };

  const renderProgressCircle = () => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(charCount / maxLength, 1);
    const strokeDashoffset = circumference * (1 - progress);
    const strokeColor = charsLeft < 0 ? '#e63946' : '#7a7b7b';

    return (
      <CircleWrapper>
        <ProgressCircle width='50' height='50'>
          <circle
            cx='25'
            cy='25'
            r={radius}
            stroke='#e6e6e6'
            strokeWidth='4'
            fill='none'
          />
          <circle
            cx='25'
            cy='25'
            r={radius}
            stroke={strokeColor}
            strokeWidth='4'
            fill='none'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
          <CircleText x='25' y='25' color={strokeColor}>
            {charCount}
          </CircleText>
        </ProgressCircle>
      </CircleWrapper>
    );
  };

  return (
    <PostContainer>
      <Title>What's making you happy right now?</Title>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputArea
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Your thought must be at least 5 characters'
          />
          {renderProgressCircle()}
        </InputWrapper>
        <SubmitButtonContainer>
          <Button type='submit' disabled={inputValue.length < 5}>
            ❤️ Send Happy Thought ❤️
          </Button>
          {error && (
            <p style={{ color: '#e63946', fontSize: '11px' }}>{error}</p>
          )}
        </SubmitButtonContainer>
      </form>
      {showAnimation && (
        <PostAnimationContainer>
          <Animation>❤️</Animation>
        </PostAnimationContainer>
      )}
    </PostContainer>
  );
};
