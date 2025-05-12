import styled from "styled-components";
import { HeartIcon } from "./HeartIcon";

const FooterWrapper = styled.footer`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 50px auto 20px;
  padding: 10px;
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #000;
  }
`;

const IconInline = styled(HeartIcon)`
  margin: 0 4px;
  vertical-align: middle;
`;

export const Footer = ({ likeCount }) => {
  return (
    <FooterWrapper>
      <p>
        You’ve <IconInline /> {likeCount} thought{likeCount !== 1 ? "s" : ""}
      </p>
      <p>
        © 2025{" "}
        <FooterLink
          href="https://github.com/violacathrine/js-project-happy-thoughts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cathi
        </FooterLink>
      </p>
    </FooterWrapper>
  );
};
