import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../userService';

const StyledLogoutButton = styled.button`
  background-color: pink;
  color: black;
  border: 1px solid black;
  box-shadow: 4px 4px 0 black;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: #ffb6c1;
  }
`;

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  return <StyledLogoutButton onClick={handleLogout}>Log out</StyledLogoutButton>;
};
