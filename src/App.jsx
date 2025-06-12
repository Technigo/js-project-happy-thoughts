import { BrowserRouter, Routes, Route } from 'react-router'
import NavBar from "./sections/NavBar"
import MainSection from "./sections/MainSection"
import Footer from "./sections/Footer"
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import Thoughts from './pages/Thoughts'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div
            className="w-full max-w-md px-10 mx-auto"
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/thoughts' element={<Thoughts />} />
              {/* <Route path='/thoughts' element={<MainSection />} /> */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
