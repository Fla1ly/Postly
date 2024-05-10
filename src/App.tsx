import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fontsource/roboto';
import './main.css'

/* PAGES */
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/test" element={<h1>Test</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
