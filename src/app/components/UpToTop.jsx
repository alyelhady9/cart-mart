"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function UpToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 md:bottom-10 md:right-10
                      bg-blue-600 text-white p-3 rounded-full shadow-lg
                      hover:bg-blue-700 transition-opacity duration-300 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                      z-50 ${showButton ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </>
  );
}