import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "./Context/AuthContext";
import Navbar from "./Navigation/Navigation";
import Home from "./Home/Home";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import CodingProfiles from "./CodingProfiles/CodingProfiles";
import Contests from "./Contests/Contests";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-coding-profiles" element={<CodingProfiles />} />
        <Route path="/upcoming-contests" element={<Contests />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
