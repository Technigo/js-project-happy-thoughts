import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: left;
  font-size: 15px;  
  background-color: pink; 
  left: 0px;
  bottom: 0px; 
  right: 0px;
  margin-bottom: 0px; 
  /* position: fixed; */
  border: 1px solid #000;  
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 1);
  width: 250px;
  height: 50px;
  margin: 28px auto; 
  padding: 12px 18px;
  gap: 12px;
  transition: ease 1s; 

  @media (min-width: 640px) {
    width: 350px;    
  }

  img {
    background-color: #FE8E86;
    border-radius: 50%;   
  }

  img:hover {  
    transform: scale(1.1);
  }

`

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>Created by: Simon & Sofia</p>
      <a href="https://github.com/solen80a/js-project-happy-thoughts" target="_blank">
        <img src="./assets/Btn - github.svg" alt="Github icon to access the code"/>
      </a>
    </FooterWrapper>
  )
}