
"use client"

import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Image from 'next/image';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import Link from 'next/link';
import offers from '../../../public/assets/herocars/offers.jpg'

// Star Rating Component
const StarRating = ({ rating }) => {
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
    
    return <div className="flex items-center space-x-1 mb-3">{stars}</div>;
};

export default function SpecialOffers() {
    const [products, setProducts] = useState([]);
    const carouselRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
                const data = await response.json();
                const filteredProducts = data.products.filter(p => p.discountPercentage >= 19).reverse();
                setProducts(filteredProducts);
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

    return (
        <div className="relative bg-gray-50 py-12">
            <div className="w-full max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Special Offers</h2>
                    <p className="text-gray-600 text-lg">Unbeatable deals and discounts just for you</p>
                </div>

                {/* Products Carousel */}
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

                    <div
                        ref={carouselRef}
                        className="flex overflow-x-scroll scrollbar-hide space-x-6 px-12 py-4"
                        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
                    >
                        {products.length > 0 ? (
                            products.map((p) => (
                                <Link key={p.id} href={`/products/${p.id}`}>
                                    <div
                                        className="flex-none w-64 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
                                        style={{ scrollSnapAlign: 'start' }}
                                    >
                                        {/* Discount Badge */}
                                        <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {Math.floor(p.discountPercentage)}% OFF
                                        </div>

                                        {/* Product Image Container */}
                                        <div className="relative bg-gray-50 rounded-t-2xl overflow-hidden h-48">
                                            <Image
                                                src={p.thumbnail}
                                                alt={p.title}
                                                width={256}
                                                height={192}
                                                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                                {p.title}
                                            </h3>
                                            
                                            {/* Star Rating */}
                                            <div className="flex items-center space-x-1 mb-3">
                                                <StarRating rating={p.rating} />
                                                <span className="text-sm text-gray-500 ml-2">({p.rating})</span>
                                            </div>
                                            
                                            {/* Price Section */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl font-bold text-blue-600">
                                                        ${Math.floor(p.price * (1 - p.discountPercentage / 100))}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${p.price.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    SALE
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
                                    <p className="text-gray-600 font-medium">Loading special offers...</p>
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

            {/* Special Offers Banner */}
            <div className="relative mt-16 w-full h-[500px] flex items-center justify-center overflow-hidden rounded-3xl mx-auto max-w-7xl">
                <Image 
                    src={offers} 
                    alt="Special offers banner" 
                    className="absolute inset-0 w-full h-full object-cover z-0 object-right md:object-center" 
                    width={1000} 
                    height={500} 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-5"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
                    <div className="max-w-lg text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            There's a deal for you, too
                        </h2>
                        <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                            Don't miss a chance to save on items you've been looking for.
                        </p>
                        <Link href={'/products'}>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Explore Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}