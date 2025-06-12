import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Thoughts } from './Sections/Thoughts';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Nav } from './Sections/Components/Nav';

export const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/thoughts' element={<Thoughts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
