import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Cards } from "./section/cards/Cards";
import { Footer } from "./section/Footer";
import { Header } from "./section/Header";
import { UserSignin } from "./section/UserSignin";
import { GlobalStyle } from "./styling/GlobalStyle"
import { Title } from "./styling/Typography"

export const App = () => {

  return (
    <>
    <BrowserRouter>
      <GlobalStyle />      
      <Header/>
      <Routes>
        <Route path="/" element={<Cards />}></Route>
        <Route path="/users" element={<UserSignin/>}></Route>
        
      </Routes>
      {/* <Title>Happy Thoughts</Title> */}      
      {/* <Footer /> */}
    </BrowserRouter>
    </>
  )
}

