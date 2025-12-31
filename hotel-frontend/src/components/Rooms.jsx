import React, { useState } from "react";
import { FaWifi, FaSwimmingPool, FaUtensils, FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RoomCategories from './RoomCategories';

const allRooms = [
  // Deluxe
  { 
    title: "Deluxe King Suite", 
    price: "₹12,000/night", 
    category: "DELUXE", 
    image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.8,
    reviews: 156,
    features: ["Free WiFi", "City View", "Luxury Amenities"],
    beds: "1 King Bed",
    size: "35 m²"
  },
  { 
    title: "Premium King Room", 
    price: "₹12,000/night", 
    category: "DELUXE", 
    image: "https://images.pexels.com/photos/6394571/pexels-photo-6394571.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.7,
    reviews: 98,
    features: ["Jacuzzi", "Balcony", "Premium Bedding"],
    beds: "1 King Bed",
    size: "40 m²"
  },
  // Executive
  { 
    title: "Executive Twin Room", 
    price: "₹20,000/night", 
    category: "EXECUTIVE", 
    image: "https://images.pexels.com/photos/6394550/pexels-photo-6394550.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.9,
    reviews: 234,
    features: ["Business Center", "Workspace", "Express Service"],
    beds: "2 Twin Beds",
    size: "45 m²"
  },
  { 
    title: "Grand Master Suite", 
    price: "₹20,000/night", 
    category: "EXECUTIVE", 
    image: "https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.8,
    reviews: 187,
    features: ["Separate Living Area", "Spa Bath", "Premium Minibar"],
    beds: "1 King Bed",
    size: "55 m²"
  },
  { 
    title: "Business Executive Suite", 
    price: "₹20,000/night",
    category: "EXECUTIVE", 
    image: "https://images.pexels.com/photos/10812974/pexels-photo-10812974.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.7,
    reviews: 142,
    features: ["Full Kitchen", "Workspace", "Conference Room Access"],
    beds: "1 King Bed",
    size: "50 m²"
  },
  // Presidential
  { 
    title: "Presidential Pool Suite", 
    price: "₹40,000/night",  
    category: "PRESIDENTIAL", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70",
    rating: 5.0,
    reviews: 89,
    features: ["Private Pool", "Concierge", "Chef Service"],
    beds: "1 King Bed + Sofa",
    size: "100 m²"
  },
  { 
    title: "Luxury Penthouse", 
    price:"₹40,000/night", 
    category: "PRESIDENTIAL", 
    image: "https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 5.0,
    reviews: 76,
    features: ["Rooftop Terrace", "Panoramic Views", "Private Elevator"],
    beds: "2 King Beds",
    size: "120 m²"
  },
  // Standard
  { 
    title: "City View Room", 
    price: "₹8,000/night", 
    category: "STANDARD", 
    image: "https://images.pexels.com/photos/7031731/pexels-photo-7031731.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.5,
    reviews: 203,
    features: ["City Views", "Modern Decor", "Work Desk"],
    beds: "1 Queen Bed",
    size: "28 m²"
  },
  { 
    title: "Romantic Honeymoon Suite", 
    price:  "₹12,000/night", 
    category: "STANDARD", 
    image: "https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.9,
    reviews: 267,
    features: ["Champagne", "Rose Petals", "Couples Massage"],
    beds: "1 King Bed",
    size: "35 m²"
  },
  { 
    title: "Garden View Suite", 
    price:"₹10,400/night",  
    category: "STANDARD", 
    image: "https://images.pexels.com/photos/14917460/pexels-photo-14917460.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.6,
    reviews: 145,
    features: ["Garden Access", "Seating Area", "Mini Fridge"],
    beds: "1 King Bed",
    size: "32 m²"
  },
  { 
    title: "Family Connecting Rooms", 
    price: "₹16,000/night", 
    category: "STANDARD", 
    image: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.7,
    reviews: 178,
    features: ["2 Connected Rooms", "Family Amenities", "Safe Box"],
    beds: "2 Queen Beds",
    size: "60 m²"
  },
  { 
    title: "Boutique Suite", 
    price: "₹11,200/night",
    category: "STANDARD", 
    image: "https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&h=350",
    rating: 4.8,
    reviews: 119,
    features: ["Artistic Decor", "Vinyl Collection", "Art Gallery"],
    beds: "1 King Bed",
    size: "33 m²"
  },
];

export default function Rooms() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL ROOMS');
  const [favorites, setFavorites] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const allFeatures = ["Free WiFi", "City View", "Balcony",  "Business Center", "Separate Living Area", "Spa Bath","Conference Room Access", "Private Pool" , "Work Desk","Seating Area", "Mini Fridge", "2 Connected Rooms"];

  const filteredRooms = allRooms.filter(room => {
    if (activeCategory !== 'ALL ROOMS' && room.category.toUpperCase() !== activeCategory.toUpperCase()) {
      return false;
    }
    if (selectedFeatures.length > 0) {
      return selectedFeatures.every(feature => room.features.includes(feature));
    }
    return true;
  });

  const toggleFavorite = (roomTitle) => {
    setFavorites(prev => 
      prev.includes(roomTitle) 
        ? prev.filter(fav => fav !== roomTitle)
        : [...prev, roomTitle]
    );
  };

  const toggleFeatureFilter = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleBookNow = (room) => {
    localStorage.setItem('selectedRoom', JSON.stringify(room));
    navigate('/booking');
  };

  return (
    <section id="rooms" className="py-0 bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-4">Our Luxurious Rooms</h1>
          <p className="text-center text-gray-400 text-lg">Discover comfort and elegance in every room</p>
        </div>
      </div>
      
      {/* Room Categories */}
      <RoomCategories 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Feature Filter Section */}
      <div className="py-8 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-white text-lg font-bold mb-4">Filter by Features:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allFeatures.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => toggleFeatureFilter(feature)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${
                  selectedFeatures.includes(feature)
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
          {selectedFeatures.length > 0 && (
            <button
              onClick={() => setSelectedFeatures([])}
              className="mt-4 text-yellow-400 hover:text-yellow-300 underline text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Room Grid */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRooms.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredRooms.map((room, idx) => (
                <div 
                  key={idx} 
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden hover:shadow-yellow-500/30 hover:shadow-2xl transition duration-300 transform hover:scale-105 border border-gray-700"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden group">
                    <img 
                      src={room.image} 
                      alt={room.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(room.title)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition duration-300 ${
                        favorites.includes(room.title) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-800 hover:bg-white'
                      }`}
                    >
                      <FaHeart />
                    </button>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      {room.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">{room.title}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(room.rating) ? "text-yellow-400" : "text-gray-600"} />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">{room.rating} ({room.reviews} reviews)</span>
                    </div>

                    {/* Room Details */}
                    <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-gray-700">
                      <div>
                        <p className="text-gray-500 text-sm">Size</p>
                        <p className="text-white font-semibold">{room.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Beds</p>
                        <p className="text-white font-semibold">{room.beds}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-gray-500 text-sm mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">From</p>
                        <p className="text-3xl font-bold text-yellow-400">{room.price}</p>
                      </div>
                      <button 
                        onClick={() => handleBookNow(room)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white text-2xl">No rooms found in {activeCategory} category</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}