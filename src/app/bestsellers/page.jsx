
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
import CardSkeletons from '../components/CardSkeletons';

// Star Rating Component (reused from SpecialOffersPage)
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

// Product Card Component (reused from SpecialOffersPage)
const ProductCard = ({ product }) => (
    <Link href={`/products/${product.id}`}>
        <div className="flex-none bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group relative overflow-hidden">
         

            {/* Product Image Container */}
            <div className="relative bg-gray-50 rounded-t-2xl overflow-hidden h-48">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={256}
                    height={192}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.title}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-gray-500 ml-2 -mt-2">({product.rating})</span>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-blue-600">
                           ${product.price}
                        </span>
                       
                    </div>
                    {/* Assuming "BESTSELLER" for Top Rated, or "SALE" if applicable */}
                    <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        BESTSELLER
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

export const TopRatedProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating'); // Default sort by rating for top-rated
    const [filterBy, setFilterBy] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
                const data = await response.json();
                // Filter for products with rating >= 4.5, limit to 12, and reverse (as per original logic)
                const topRated = data.products.filter(p => p.rating >= 4.5).slice(0, 12).reverse();
                setProducts(topRated);
                setFilteredProducts(topRated); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter and search products
    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(product => product.category === filterBy);
        }

        // Sorting
        switch (sortBy) {
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating); // Sort by rating (desc)
                break;
            case 'price-low':
                filtered.sort((a, b) => (a.price * (1 - a.discountPercentage / 100)) - (b.price * (1 - b.discountPercentage / 100)));
                break;
            case 'price-high':
                filtered.sort((a, b) => (b.price * (1 - b.discountPercentage / 100)) - (a.price * (1 - a.discountPercentage / 100)));
                break;
            case 'discount':
                filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, searchTerm, sortBy, filterBy]);

    // Get unique categories for filtering
    const categories = ['all', ...new Set(products.map(p => p.category))];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>Top Rated Products</h2>

                {/* Filters and Search Section */}
                <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex items-center space-x-4">
                        {/* Category Filter */}
                        <select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                        >
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="discount">Highest Discount</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                            >
                                <FiGrid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                            >
                                <FiList size={20} />
                            </button>
                        </div>
                    </div>
                </div>

              

                {/* Products Grid/List */}
                {loading ? (
                    <div className='flex gap-4'>
                        <CardSkeletons />
                        <CardSkeletons />
                     

                    </div>
                ) : (
                    <>
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1 md:grid-cols-2'
                            }`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-gray-400 mb-4">
                                    <FiSearch size={64} className="mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterBy('all');
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TopRatedProductsPage;