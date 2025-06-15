import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import NavBar from "./sections/NavBar"
import Footer from "./sections/Footer"
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import Thoughts from './pages/Thoughts'
import NotFound from './pages/NotFound'
import ProtectedPage from './pages/ProtectedPage'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div
            className="w-full max-w-md px-4 min-[375px]:px-10 mx-auto"
          >
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/thoughts'
                element={
                  <ProtectedPage>
                    <Thoughts />
                  </ProtectedPage>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
