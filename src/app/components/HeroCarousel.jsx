

"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import bgImg2 from '../../../public/assets/herocars/2.jpg';
import bgImg3 from '../../../public/assets/herocars/3.jpg';

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=120');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const product1 = products.find(product => product.id === 117);
  const product2 = products.find(product => product.id === 94);
  const product3 = products.find(product => product.id === 81);

  useEffect(() => {
    if (products.length > 0) {
      const imagesToDisplay = [];
      if (product1) imagesToDisplay.push(product1.thumbnail || product1.images[0]);
      if (product2) imagesToDisplay.push(product2.thumbnail || product2.images[0]);
      if (product3) imagesToDisplay.push(product3.thumbnail || product3.images[0]);

      setProductImages(imagesToDisplay);
    }
  }, [products, product1, product2, product3]);

  const carouselDivs = [
    {
      id: 1,
      title: 'Your favs are all here!',
      subTitle: 'Drive your passion, define your moments, and engineer your future.',
      bgImg: null,
      // bgColor: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
      bgColor: 'bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400',
      links: [
        {
          LinkPhoto: productImages[0],
          LinkName: 'Motorcycles & Bikes',
          LinkUrl: `/categories/Motorcycle`
        },
        {
          LinkPhoto: productImages[1],
          LinkName: 'Watches',
          LinkUrl: `/categories/Mens Watches`
        },
        {
          LinkPhoto: productImages[2],
          LinkName: 'Laptops & Computers',
          LinkUrl: `/categories/Laptops`
        },
      ],
      btn: {
        Name: 'View all Categories',
        link: '/categories'
      },
    },
    {
      id: 2,
      title: 'Returns made simple!',
      subTitle: `Not happy with your purchase? It's easy to start a return.`,
      bgImg: bgImg2,
      bgColor: null,
      links: [],
      btn: {
        Name: 'Learn more',
        link: '/contact'
      },
    },
    {
      id: 3,
      title: 'Get help exactly when you need it',
      subTitle: 'From shipping to returns, find answers to all of your questions.',
      bgImg: bgImg3,
      bgColor: null,
      links: [],
      btn: {
        Name: 'Start here',
        link: '/contact'
      },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselDivs.length);
      }, 5000); // Changed to 5 seconds for better UX
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, carouselDivs.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselDivs.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselDivs.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const imageLoader = useCallback(({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Carousel Content */}
      <div
        ref={carouselRef}
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
      >
        {carouselDivs.map((div, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 flex items-center justify-center text-white ${div.bgColor || 'bg-gray-900'} relative`}
          >
            {div.id === 1 ? (
              // First slide with category links
              <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-32 max-sm:px-6 lg:px-16  py-8 lg:py-12">
                <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0 lg:pr-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 lg:mb-6 leading-tight">
                    {div.title}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-2xl mb-4 lg:mb-8 opacity-90 max-w-2xl mx-auto lg:mx-0">
                    {div.subTitle}
                  </p>
                  {div.btn && (
                    <Link 
                      href={div.btn.link} 
                      className="inline-block bg-white text-gray-900 px-5 py-2.5 lg:px-8 lg:py-4 rounded-lg text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {div.btn.Name}
                    </Link>
                  )}
                </div>
                
                <div className="flex-1 flex justify-center lg:justify-end w-full">
                  <div className="grid grid-cols-3 max-sm:gap-6 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-6 w-full max-w-sm lg:max-w-none">
                    {div.links.map((link, linkIndex) => (
                      link && link.LinkPhoto ? (
                        <Link 
                          href={link.LinkUrl} 
                          key={linkIndex} 
                          className="flex flex-col items-center group transition-all duration-300 hover:scale-105"
                        >
                          <div className="relative w-16 h-16 max-sm:w-20 max-sm:h-20 sm:w-32 sm:h-32 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <Image
                              src={link.LinkPhoto}
                              alt={link.LinkName}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
                            />
                          </div>
                          <p className="text-xs sm:text-sm lg:text-base font-medium text-center mt-1.5 sm:mt-2 lg:mt-3 group-hover:text-gray-200 transition-colors duration-300 leading-tight">
                            {link.LinkName}
                          </p>
                        </Link>
                      ) : null
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Other slides with background images
              <div className="relative w-full h-full flex items-center justify-center">
                {div.bgImg && (
                  <Image
                    src={div.bgImg}
                    alt={div.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                    {div.title}
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8 opacity-90">
                    {div.subTitle}
                  </p>
                  {div.btn && (
                    <Link 
                      href={div.btn.link} 
                      className="inline-block bg-white text-gray-900 px-6 py-3 lg:px-8 lg:py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {div.btn.Name}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevious}
          className="ml-4 p-2 lg:p-3 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={goToNext}
          className="mr-4 p-2 lg:p-3 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {carouselDivs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </div>
  );
}

export default HeroCarousel;
