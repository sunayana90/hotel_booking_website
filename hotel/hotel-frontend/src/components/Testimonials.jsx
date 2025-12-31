import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      title: "Travel Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
      text: "Luxe Haven exceeded all my expectations. The impeccable service, stunning ambience, and world-class amenities made my stay unforgettable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      title: "Business Executive",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
      text: "Perfect location, exceptional staff, and luxurious rooms. The restaurant's cuisine is outstanding. Highly recommended for both business and leisure.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Mitchell",
      title: "Luxury Travel Consultant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150",
      text: "This hotel sets the gold standard for luxury. Every detail is carefully curated, from the spa treatments to the fine dining experience.",
      rating: 5,
    },
    {
      id: 4,
      name: "Vikram Patel",
      title: "Corporate Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150",
      text: "Hosted our corporate retreat here and everything was perfectly organized. The conference facilities are top-notch!",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-400 mb-4">
            Guest Testimonials
          </h2>
          <p className="text-gray-400 text-lg">
            Hear what our valued guests have to say about their experience
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={current.image}
                alt={current.name}
                className="w-64 h-64 rounded-full object-cover border-8 border-yellow-500/30 hover:border-yellow-500 transition duration-300 shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black p-4 rounded-full">
                <FaQuoteLeft className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Right - Testimonial Content */}
          <div className="bg-gradient-to-br from-neutral-900 to-black border border-yellow-500/20 p-10 rounded-2xl shadow-2xl">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed italic">
              "{current.text}"
            </p>

            {/* Guest Info */}
            <div className="border-t border-yellow-500/20 pt-6">
              <h4 className="text-yellow-400 font-bold text-xl mb-1">
                {current.name}
              </h4>
              <p className="text-gray-500 mb-6">{current.title}</p>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition duration-300 ${
                    idx === currentIndex ? "bg-yellow-500 w-8" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-20 text-center">
          <div className="bg-neutral-900 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500 transition">
            <div className="text-4xl font-bold text-yellow-400 mb-2">15K+</div>
            <p className="text-gray-400">Happy Guests</p>
          </div>
          <div className="bg-neutral-900 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500 transition">
            <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
            <p className="text-gray-400">Average Rating</p>
          </div>
          <div className="bg-neutral-900 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500 transition">
            <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
            <p className="text-gray-400">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
}
