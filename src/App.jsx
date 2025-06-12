import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainSection } from "./section/MainSection"
import { Header } from "./section/Header"
import { SignUp } from "./section/SignUp"
import { LogIn } from "./section/LogIn" 

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/thoughts"
          element={
            <>
              <Header />
              <MainSection />
            </>
          }
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/login"
          element={<LogIn />}
        />
      </Routes>
    </BrowserRouter>
  )
}
