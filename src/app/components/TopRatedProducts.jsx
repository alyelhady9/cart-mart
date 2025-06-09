
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

export const TopRatedProducts = () => {
    const [products, setProducts] = useState([]);
    const carouselRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
                const data = await response.json();
                const filteredProducts = data.products.filter(p => p.rating >= 4.5);
                setProducts(filteredProducts.slice(0, 12).reverse());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const updateArrowVisibility = () => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                setShowLeftArrow(scrollLeft > 5);
                setShowRightArrow(Math.ceil(scrollLeft) + clientWidth < scrollWidth - 5);
            }
        };

        const currentCarousel = carouselRef.current;

        if (currentCarousel) {
            const checkInitialVisibility = () => {
                if (currentCarousel.scrollWidth <= currentCarousel.clientWidth) {
                    setShowLeftArrow(false);
                    setShowRightArrow(false);
                } else {
                    setShowLeftArrow(currentCarousel.scrollLeft > 5);
                    setShowRightArrow(Math.ceil(currentCarousel.scrollLeft) + currentCarousel.clientWidth < currentCarousel.scrollWidth - 5);
                }
            };
            
            const timeoutId = setTimeout(checkInitialVisibility, 0); 

            currentCarousel.addEventListener('scroll', updateArrowVisibility);
            window.addEventListener('resize', updateArrowVisibility);

            return () => {
                clearTimeout(timeoutId);
                currentCarousel.removeEventListener('scroll', updateArrowVisibility);
                window.removeEventListener('resize', updateArrowVisibility);
            };
        }
    }, [products]);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<BiSolidStar key={i} className="text-yellow-500" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<BiSolidStarHalf key={i} className="text-yellow-500" />);
            } else {
                stars.push(<BiStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="relative my-12 w-full max-w-7xl px-6 mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Best Sellers</h2>
                <p className="text-gray-600 text-lg">Discover our top-rated products loved by customers</p>
            </div>
                    
            <div className="flex items-center relative">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200"
                        aria-label="Scroll left"
                    >
                        <MdOutlineArrowBackIos size={20} className="text-blue-600" />
                    </button>
                )}

                {/* Products Carousel */}
                <div
                    ref={carouselRef}
                    className="flex overflow-x-scroll scrollbar-hide space-x-6 px-12 py-4"
                    style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
                >
                    {products.length > 0 ? (
                        products.map((p) => (
                            <Link key={p.id} href={`products/${p.id}`}>
                                <div
                                    className="flex-none w-64 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    {/* Product Image Container */}
                                    <div className="relative bg-gray-50 rounded-t-2xl overflow-hidden h-48">
                                        <Image
                                            src={p.thumbnail}
                                            alt={p.title}
                                            width={256}
                                            height={192}
                                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Rating Badge */}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                                            <BiSolidStar className="text-yellow-500 text-sm" />
                                            <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                            {p.title}
                                        </h3>
                                        
                                        {/* Star Rating */}
                                        <div className="flex items-center space-x-1 mb-3">
                                            {renderStars(p.rating)}
                                            <span className="text-sm text-gray-500 ml-2">({p.rating})</span>
                                        </div>
                                        
                                        {/* Price */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-blue-600">${p.price}</span>
                                            <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                BESTSELLER
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full py-12">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                <p className="text-gray-600 font-medium">Loading top-rated products...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200"
                        aria-label="Scroll right"
                    >
                        <MdOutlineArrowForwardIos size={20} className="text-blue-600" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopRatedProducts;