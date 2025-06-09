"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CategoryDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setIsOpen(false);
    if (toggleMenu) {
      toggleMenu();
    }
  };
// console.log(categories);
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md  px-4 py-2 text-sm font-medium  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={handleToggle}
      >
        Categories
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute -left-[50%] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 text-center" role="none">
            <div className="block px-4 py-2 text-sm text-gray-700 font-semibold border-b border-gray-200">
              Categories
            </div>

            {categories.slice(0, 12).map((categoryName, index) => (
                 
              <Link
                key={index}
                href={`/categories/${categoryName.name}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer capitalize"
                role="menuitem"
                onClick={handleItemClick}
              >
                {categoryName.name.replace(/-/g, ' ')}
              </Link>
            ))}

            <div className="border-t border-gray-200 my-1" role="separator"></div>

            <Link
              href={'/categories'}
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800 cursor-pointer"
              role="menuitem"
              onClick={handleItemClick}
            >
              View All Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
