import React from 'react';
// Assuming Navbar and Footer are located in the same components directory
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * DefaultLayout component wraps all primary pages (Home, Rooms, Menu, etc.).
 * It ensures the Navbar and Footer are consistently displayed around the page content.
 * * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The child components (the current page content)
 */
export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      
      {/* The <main> tag is good practice for semantic HTML. 
        It holds the actual content of the current page (e.g., <Rooms />, <Menu />). 
      */}
      <main>
        {children}
      </main>
      
      <Footer />
    </>
  );
}