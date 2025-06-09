

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoFilterOutline } from 'react-icons/io5';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// Loading component
function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded mb-3 w-3/4"></div>
                    <div className="bg-gray-200 h-5 rounded w-1/3"></div>
                </div>
            ))}
        </div>
    );
}

// Main search component
function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('relevance');
    const [filterBy, setFilterBy] = useState('all');
    const [categories, setCategories] = useState([]);

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
        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    // Filter products
    const filteredProducts = sortedProducts.filter(product => {
        if (filterBy === 'all') return true;
        return product.category === filterBy;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <IoSearchOutline className="text-blue-600 text-2xl" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Search Results for "{query}"
                        </h1>
                    </div>
                    
                    {!loading && (
                        <p className="text-gray-600">
                            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Sorting */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <IoFilterOutline className="text-gray-500" />
                        <select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.slug} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                        <FaSort className="text-gray-500" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <LoadingSkeleton />
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Link 
                                key={product.id} 
                                href={`/products/${product.id}`}
                                className="group"
                            >
                                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 h-48 flex flex-col group-hover:-translate-y-1">
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            width={300}
                                            height={300}
                                            className="object-contain w-full  group-hover:scale-105 transition-transform duration-300"
                                        />
                                        
                                        {/* Discount Badge */}
                                        {product.discountPercentage > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                -{Math.round(product.discountPercentage)}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {product.title}
                                        </h3>
                                        
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                                            {product.description}
                                        </p>
                                        
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-3">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="text-sm">
                                                        {i < Math.floor(product.rating) ? '★' : '☆'}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({product.rating})
                                            </span>
                                        </div>
                                        
                                        {/* Price */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-blue-600">
                                                ${product.price}
                                            </span>
                                            {product.discountPercentage > 0 && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Category */}
                                        <div className="mt-2">
                                            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs capitalize">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* No Results */
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-8xl mb-6">🔍</div>
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">
                            No products found for "{query}"
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            We couldn't find any products matching your search. Try different keywords or browse our categories.
                        </p>
                        
                        {/* Suggestions */}
                        <div className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Try searching for:</h3>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {['phone', 'laptop', 'watch', 'headphones', 'camera'].map((suggestion) => (
                                    <Link
                                        key={suggestion}
                                        href={`/search?q=${suggestion}`}
                                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                                    >
                                        {suggestion}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Main page component with Suspense
function SearchPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <SearchContent />
        </Suspense>
    );
}

export default SearchPage;







