import React, { useState } from 'react';

// The categories for the room filters
const categories = [
  'ALL ROOMS',
  'STANDARD',
  'DELUXE',
  'EXECUTIVE',
  'PRESIDENTIAL'
];

export default function RoomCategories() {
  // State to track which category button is currently active/selected
  const [activeCategory, setActiveCategory] = useState('ALL ROOMS');

  // Function to determine the button's Tailwind classes based on its active state
  const getButtonClasses = (category) => {
    const baseClasses = 
      "px-6 py-2 rounded-lg font-medium text-sm tracking-wider uppercase transition-colors duration-200 ease-in-out whitespace-nowrap";

    if (category === activeCategory) {
      // Classes for the active (selected) button: Gold background, dark text
      return `${baseClasses} bg-yellow-500 text-black shadow-lg hover:bg-yellow-400`;
    } else {
      // Classes for the inactive button: Dark background, light text, border
      return `${baseClasses} bg-transparent text-white border border-gray-700 hover:bg-gray-800 hover:border-yellow-500`;
    }
  };

  return (
    // Outer container for the category section.
    // It uses a dark background and centers the content.
    <section className="bg-black py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/*
          The main flex container for the buttons:
          - flex: makes items align horizontally.
          - justify-center: centers the buttons.
          - space-x-3: adds horizontal spacing between buttons.
          - overflow-x-auto: allows horizontal scrolling on small screens (mobile).
          - p-2: adds padding for better mobile scroll appearance.
          - custom scrollbar classes (scrollbar-hide) are often added here,
            but require custom CSS or a Tailwind plugin, so we keep it simple.
        */}
        <div className="flex justify-center space-x-3 overflow-x-auto p-2">
          {categories.map((category) => (
            <button
              key={category}
              className={getButtonClasses(category)}
              onClick={() => {
                setActiveCategory(category);
                // **TODO:** Add your filtering logic here.
                // For example: filterRooms(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
      </div>
    </section>
  );
}