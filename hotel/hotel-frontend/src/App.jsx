
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Hero";
import Rooms from "./components/Rooms";
import Menu from "./components/Menu";
import Booking from "./components/Booking";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import SignIn from "./components/sign-in";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Dashboard from "./components/dashboard/Dashboard";



function App() {
  return (
    <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ChatBot />
        <Footer />

    </BrowserRouter>
  );
}

export default App;