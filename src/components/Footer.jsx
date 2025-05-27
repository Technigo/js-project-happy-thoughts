
import styled from "styled-components"


const StyledFooter = styled.footer`
  text-align: center;
  margin-top: 20px;
  font-size: 0.8rem;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>Made with ❤️ by Therese</p>
      <p>Check out the code on <a href="https://github.com/Lillebrorgroda/js-project-happy-thoughts">GitHub</a></p>
    </StyledFooter>

  )
}

export default Footer