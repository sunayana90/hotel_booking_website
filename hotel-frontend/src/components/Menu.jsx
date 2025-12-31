import React, { useState } from "react";
// Assuming you save the new component as './MenuCategories'
import MenuCategories from './MenuCategories'; 

// Updated menu items with images
const allMenuItems = [
  // MAIN COURSE
  { name: "Grilled Salmon with Asparagus", price: "$25", category: "MAIN COURSE", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60" },
  { name: "Premium Wagyu Ribeye Steak", price: "$65", category: "MAIN COURSE", image: "https://images.unsplash.com/photo-1575900365671-6b67e2265d98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UHJlbWl1bSUyMFdhZ3l1JTIwUmliZXllJTIwU3RlYWt8ZW58MHx8MHx8fDA%3D" },
  { name: "Lobster Ravioli", price: "$35", category: "MAIN COURSE", image: "https://images.unsplash.com/photo-1701495815784-83f031f55346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TG9ic3RlciUyMFJhdmlvbGl8ZW58MHx8MHx8fDA%3D" },
  { name: "Truffle Mushroom Pasta", price: "$30", category: "MAIN COURSE", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=60" },
  // APPETIZERS
  { name: "Tuna Tartare", price: "$18", category: "APPETIZERS", image: "https://images.unsplash.com/photo-1656106577512-0259bf5b9fd6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Artisan Cheese Plate", price: "$22", category: "APPETIZERS", image: "https://plus.unsplash.com/premium_photo-1690056321739-2663df5958b6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QXJ0aXNhbiUyMENoZWVzZSUyMFBsYXRlfGVufDB8fDB8fHww" },
  { name: "Seasonal Vegan Salad", price: "$15", category: "APPETIZERS", image: "https://images.unsplash.com/photo-1574031491550-35f444917508?q=80&w=909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  // DESSERTS
  { name: "Valrhona Chocolate Lava Cake", price: "$12", category: "DESSERTS", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=60" },
  { name: "Grand Marnier Soufflé", price: "$15", category: "DESSERTS", image: "https://media.istockphoto.com/id/2210320773/photo/a-fluffy-golden-souffl%C3%A9-dusted-with-powdered-sugar-served-in-a-classic-ramekin-garnished-with.jpg?s=2048x2048&w=is&k=20&c=z8__goF86TyIK6hprUWbvylh8a6z_xcLn3Y7uFixvQM=" },
  // BEVERAGES
  { name: "Espresso Martini", price: "$14", category: "BEVERAGES", image: "https://images.unsplash.com/photo-1607687633950-c745bdb4da70?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Freshly Squeezed Orange Juice", price: "$8", category: "BEVERAGES", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=60" },
];

export default function Menu() {
  // 1. STATE: Initialize state for the active category, defaulting to ALL DISHES
  const [activeCategory, setActiveCategory] = useState('ALL DISHES');

  // 2. FILTER LOGIC: Determine which items to display
  const filteredMenuItems = allMenuItems.filter(item => {
    if (activeCategory === 'ALL DISHES') {
      return true; // Show everything
    }
    // Filter by the selected category (case-insensitive for safety)
    return item.category.toUpperCase() === activeCategory.toUpperCase();
  });

  return (
    <section id="menu" className="py-0 bg-gray-900 min-h-screen">
      
      {/* Hero Section (to include the text seen in your image) */}
      <div className="bg-black text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Note: The 'chef hat' logo and text styling is simplified here */}
          <h2 className="text-5xl font-serif text-yellow-500 mt-4">Fine Dining Menu</h2>
          <p className="text-xl mt-2 text-gray-400">
            Michelin-starred cuisine crafted by award-winning chefs
          </p>
        </div>
      </div>

      {/* 3. MenuCategories Component: Pass the state and setter down */}
      <MenuCategories 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      {/* Menu Item Listing Grid */}
      <div className="py-10 bg-gray-900">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          
          {/* Loop over the filtered items */}
          {filteredMenuItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden text-white hover:scale-105 transition duration-300 transform border border-gray-700 hover:border-yellow-500"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.category}</p>
                <div className="flex justify-between items-center">
                  <p className="text-yellow-500 text-2xl font-semibold">{item.price}</p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Message if no items are found */}
          {filteredMenuItems.length === 0 && (
            <p className="text-white text-center col-span-full py-10">No items found in the {activeCategory} category.</p>
          )}

        </div>
      </div>
    </section>
  );
}