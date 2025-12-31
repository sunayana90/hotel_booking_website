import React, { useState } from "react";
// Assuming you import the new component
import GalleryCategories from './GalleryCategories'; 

// Updated image data with a 'category' field for filtering
const allGalleryImages = [
  // ROOMS
  { url: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "ROOMS" },
  { url: "https://images.pexels.com/photos/2566037/pexels-photo-2566037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "ROOMS" },
  { url: "https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "ROOMS" },
  { url: "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "ROOMS" },
  // DINING
  { url: "https://images.pexels.com/photos/189295/pexels-photo-189295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "DINING" },
  { url: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=800&q=80", category: "DINING" },
  { url: "https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "DINING" },
  { url: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "DINING" },
  // AMENITIES
  { url: "https://images.pexels.com/photos/14917460/pexels-photo-14917460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "AMENITIES" },
  { url: "https://images.pexels.com/photos/6394550/pexels-photo-6394550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "AMENITIES" },
  // SPA & WELLNESS
  { url: "https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "SPA & WELLNESS" },
  { url: "https://images.pexels.com/photos/10812974/pexels-photo-10812974.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", category: "SPA & WELLNESS" },
];

export default function Gallery() {
  // 1. STATE: Initialize state for the active category
  const [activeCategory, setActiveCategory] = useState('ALL PHOTOS');

  // 2. FILTER LOGIC: Filter images based on the active category
  const filteredImages = allGalleryImages.filter(image => {
    if (activeCategory === 'ALL PHOTOS') {
      return true; // Show all images
    }
    // Filter by the selected category (case-insensitive for safety)
    return image.category.toUpperCase() === activeCategory.toUpperCase();
  });

  return (
    <section id="gallery" className="py-0 bg-gray-900 min-h-screen">
      
      {/* Hero Section (Matching the look from your image) */}
      <div className="bg-black text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-serif text-yellow-500 mt-4">Our Gallery</h2>
          <p className="text-xl mt-2 text-gray-400">
            Explore the beauty and elegance of Luxe Haven
          </p>
        </div>
      </div>

      {/* 3. GalleryCategories Component: Pass the state and setter down */}
      <GalleryCategories 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      {/* Image Grid */}
      <div className="py-10 bg-gray-900">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
          
          {/* Loop over the filtered images */}
          {filteredImages.map((img, idx) => (
            <img 
              key={idx} 
              src={img.url} 
              alt={`Gallery Image ${idx + 1} - ${img.category}`}
              className="w-full h-48 object-cover rounded-lg shadow-xl hover:scale-105 
                         transition duration-300 transform cursor-pointer border-2 border-transparent hover:border-yellow-500" 
            />
          ))}

          {/* Message if no images are found */}
          {filteredImages.length === 0 && (
            <p className="text-white text-center col-span-full py-10">No images found in the {activeCategory} category.</p>
          )}

        </div>
      </div>
    </section>
  );
}