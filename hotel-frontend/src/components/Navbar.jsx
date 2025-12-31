import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Listen for storage changes (logout from other tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(!!loggedIn);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/menu", label: "Menu" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "backdrop-blur-md bg-black/80 shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
          >
            <span className="text-yellow-400 font-bold text-2xl hidden sm:inline">
              Luxe Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 font-semibold uppercase text-sm transition-all duration-300 rounded-lg ${
                  isActive(link.to)
                    ? "bg-yellow-500 text-black"
                    : "text-white hover:bg-yellow-500/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          {/* <div className="hidden lg:flex space-x-3">
            <Link
              to="/sign-in"
              className="px-6 py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 font-semibold"
            >
              Sign In
            </Link>
            <Link
              to="/booking"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300 font-semibold"
            >
              Book Now
            </Link>
          </div> */}

          {/* Desktop Buttons */}
<div className="hidden lg:flex space-x-3 items-center">
  {isLoggedIn && (
    <Link
      to="/profile"
      className="px-5 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
    >
      Profile
    </Link>
  )}

  {!isLoggedIn && (
    <Link
      to="/sign-in"
      className="px-6 py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 font-semibold"
    >
      Sign In
    </Link>
  )}

  <Link
    to="/booking"
    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300 font-semibold"
  >
    Book Now
  </Link>
</div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl transition-transform duration-300"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/30 animate-in slide-in-from-top-2">
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isActive(link.to)
                      ? "bg-yellow-500 text-black"
                      : "text-white hover:bg-yellow-500/20"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-700 space-y-3">
                {isLoggedIn && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-yellow-500 text-black rounded-lg text-center font-semibold hover:bg-yellow-400"
                  >
                    Profile
                  </Link>
                )}

                {!isLoggedIn && (
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition text-center font-semibold"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg text-center font-semibold hover:shadow-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
