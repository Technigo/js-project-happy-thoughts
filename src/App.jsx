import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </Router>
  );
};
