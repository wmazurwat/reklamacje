import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import New from "./pages/New";
import Review from "./pages/Review";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
