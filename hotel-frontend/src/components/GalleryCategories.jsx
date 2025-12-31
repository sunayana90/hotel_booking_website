import React from 'react';

const categories = [
  'ALL PHOTOS',
  'ROOMS',
  'DINING',
  'AMENITIES',
  'SPA & WELLNESS'
];

// Component receives props for the active category and the setter function
export default function GalleryCategories({ activeCategory, setActiveCategory }) {
  
  const getButtonClasses = (category) => {
    const baseClasses = 
      "px-6 py-2 rounded-lg font-medium text-sm tracking-wider uppercase transition-colors duration-200 ease-in-out whitespace-nowrap";

    if (category === activeCategory) {
      // Active button classes (Gold background, dark text)
      return `${baseClasses} bg-yellow-500 text-black shadow-lg hover:bg-yellow-400`;
    } else {
      // Inactive button classes (Dark background, light text, border)
      // Matching the dark background of the gallery hero section
      return `${baseClasses} bg-transparent text-white border border-gray-700 hover:bg-gray-800 hover:border-yellow-500`;
    }
  };

  return (
    // Matching the dark aesthetic of the header
    <section className="bg-black py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-3 overflow-x-auto p-2">
          {categories.map((category) => (
            <button
              key={category}
              className={getButtonClasses(category)}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}