import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/menu", label: "Menu" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  const services = [
    "Luxury Accommodations",
    "Fine Dining Restaurant",
    "Spa & Wellness Center",
    "Conference Facilities",
    "Concierge Service",
    "Room Service 24/7",
  ];

  const socialLinks = [
    { icon: FaFacebookF, link: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
    { icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
    { icon: FaLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 text-yellow-400 text-2xl font-bold mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">L</span>
              </div>
              Luxe Haven
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience unparalleled luxury and exceptional service at our boutique hotel and fine dining restaurant. Your comfort is our priority.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-yellow-400 text-yellow-400 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition duration-300 transform hover:scale-110"
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-6 flex items-center gap-2">
              <FaArrowRight className="text-sm" /> Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-yellow-400 transition duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition duration-300">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-6 flex items-center gap-2">
              <FaArrowRight className="text-sm" /> Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400 hover:text-yellow-400 cursor-pointer transition duration-300 flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition duration-300">→</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-6 flex items-center gap-2">
              <FaArrowRight className="text-sm" /> Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-yellow-400 text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Luxury Boulevard,<br />
                  Mumbai, Maharashtra<br />
                  400001, India
                </span>
              </li>
              <li className="flex gap-3">
                <FaPhoneAlt className="text-yellow-400 text-lg flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 (22) 1234-5678</span>
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="text-yellow-400 text-lg flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@luxehaven.com</span>
              </li>
              <li className="flex gap-3">
                <FaClock className="text-yellow-400 text-lg flex-shrink-0" />
                <span className="text-gray-400 text-sm">24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>© {currentYear} Luxe Haven. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
            <button className="hover:text-yellow-400 transition duration-300">
              Privacy Policy
            </button>
            <span className="hidden md:inline text-gray-600">•</span>
            <button className="hover:text-yellow-400 transition duration-300">
              Terms of Service
            </button>
            <span className="hidden md:inline text-gray-600">•</span>
            <button className="hover:text-yellow-400 transition duration-300">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="text-center pb-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-yellow-400 hover:text-yellow-300 transition duration-300 text-sm"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
