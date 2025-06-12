import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
  width: 700px;
  margin: 30px auto 30px auto; /* 30px margin on top and bottom, centered */
  background: #7b2ff2;

  box-shadow: 0 4px 0 #6a1cc7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-radius: 24px; /* all corners rounded */
`;

const NavList = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0 30px;
  align-items: center;
`;

const NavItem = styled.li`
  font-family: monospace;
  font-weight: 500;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: #fff; // white text
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  padding: 6px 16px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover,
  &:focus {
    background: #f357a8;
    color: #fff;
  }
`;

export const Nav = () => {
  return (
    <NavBar>
      <NavList>
        <NavItem>
          <StyledLink to='/'>Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/login'>Login</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/register'>Register</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/thoughts'>See all thoughts</StyledLink>
        </NavItem>
      </NavList>
    </NavBar>
  );
};
