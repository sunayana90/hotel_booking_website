import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaStar } from "react-icons/fa";
import Amenities from "./Amenities";
import Offers from "./Offers";
import Testimonials from "./Testimonials";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-10 px-4 max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-6 py-3 rounded-full text-sm font-semibold hover:bg-yellow-500/30 transition duration-300">
            <FaStar className="text-yellow-500" />
            5-Star Hotel Experience
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight drop-shadow-lg space-y-4">
            Experience <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent block">
              Unparalleled Luxury
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl md:text-4xl text-yellow-300 font-light tracking-widest">
            Where Elegance Meets Excellence
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Indulge in world-class accommodations, exquisite fine dining, and unmatched hospitality at Luxe Haven. Your sanctuary of comfort awaits.
          </p>

          {/* Stats - Improved Spacing */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto py-12 px-4">
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400">250+</div>
              <p className="text-gray-400 text-sm md:text-base mt-2">Luxury Rooms</p>
            </div>
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400">15K+</div>
              <p className="text-gray-400 text-sm md:text-base mt-2">Happy Guests</p>
            </div>
            <div className="text-center transform hover:scale-110 transition duration-300">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400">4.9/5</div>
              <p className="text-gray-400 text-sm md:text-base mt-2">Rating</p>
            </div>
          </div>

          {/* Buttons - Improved Spacing */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              to="/booking"
              className="font-bold uppercase bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-4 rounded-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition duration-300 transform hover:scale-105 text-lg"
            >
              Book Your Stay
            </Link>

            <Link
              to="/rooms"
              className="font-bold uppercase border-2 border-yellow-500 text-yellow-400 px-10 py-4 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 transform hover:scale-105 text-lg"
            >
              Explore Rooms
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="pt-6">
            <button
              onClick={() => scrollToSection('rooms')}
              className="text-yellow-400 hover:text-yellow-300 transition font-semibold underline underline-offset-4"
            >
              View Our Collection
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hover:text-yellow-300 transition"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-yellow-400">Scroll to explore</span>
            <div className="animate-bounce">
              <FaChevronDown className="text-2xl text-yellow-500" />
            </div>
          </div>
        </button>
      </section>

      {/* HOME PAGE SECTIONS */}
      <Amenities />
      <Offers />
      <Testimonials />
    </>
  );
}
