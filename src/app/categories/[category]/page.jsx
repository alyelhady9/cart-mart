

"use client"

import Image from 'next/image';
import React, { useState, useEffect, use } from 'react'
import Link from 'next/link';
import { IoGridOutline, IoListOutline, IoFilterOutline } from 'react-icons/io5';
import { FaSort, FaStar } from 'react-icons/fa';

function page({ params }) {
    const { category } = use(params);
    const categoryName = category.toLowerCase().replace(/%20/g, '-');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
                const data = await response.json();
                const filteredProducts = data.products.filter(product => product.category === categoryName);
                setProducts(filteredProducts);
                console.log(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

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

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
            "space-y-4"
        }>
            {[...Array(8)].map((_, index) => (
                <div key={index} className={viewMode === 'grid' ? 
                    "bg-white rounded-xl shadow-sm p-4 animate-pulse" :
                    "bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 animate-pulse"
                }>
                    <div className={viewMode === 'grid' ? 
                        "bg-gray-200 h-48 rounded-lg mb-4" :
                        "bg-gray-200 w-32 h-32 rounded-lg flex-shrink-0"
                    }></div>
                    <div className="flex-1">
                        <div className="bg-gray-200 h-4 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 rounded mb-3 w-3/4"></div>
                        <div className="bg-gray-200 h-5 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header Section */}
                <div className='bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-600'>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div>
                            <h1 className='text-4xl font-black text-gray-800 mb-2 capitalize'>
                                {categoryName.replace(/-/g, ' ')}
                            </h1>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                                <p className='text-gray-600 font-medium'>
                                    {loading ? 'Loading...' : `${sortedProducts.length} products found`}
                                </p>
                            </div>
                        </div>
                        
                        {/* View Toggle */}
                        <div className='flex items-center gap-4'>
                            <div className='bg-gray-100 rounded-lg p-1 flex'>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === 'grid' 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <IoGridOutline size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === 'list' 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <IoListOutline size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sorting Controls */}
                <div className='bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4 flex-wrap'>
                    <div className='flex items-center gap-2'>
                        <FaSort className='text-blue-600' />
                        <span className='text-gray-700 font-medium'>Sort by:</span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='border-2 border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    >
                        <option value="name">Name: A to Z</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                {/* Products Grid/List */}
                {loading ? (
                    <LoadingSkeleton />
                ) : sortedProducts.length > 0 ? (
                    <div className={viewMode === 'grid' ? 
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
                        "space-y-4"
                    }>
                        {sortedProducts.map((product, i) => (
                            <Link key={i} href={`/products/${product.id}`}>
                                <div className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-yellow-500 ${
                                    viewMode === 'grid' 
                                        ? 'p-6 hover:-translate-y-2' 
                                        : 'p-4 flex items-center gap-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50'
                                }`}>
                                    {/* Product Image */}
                                    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-yellow-100 ${
                                        viewMode === 'grid' ? 'mb-4' : 'flex-shrink-0'
                                    }`}>
                                        <Image 
                                            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                                                viewMode === 'grid' ? 'w-full h-48' : 'w-32 h-32'
                                            }`}
                                            src={product.thumbnail} 
                                            alt={product.title}  
                                            width={200} 
                                            height={200}
                                        />
                                        
                                        {/* Discount Badge */}
                                        {product.discountPercentage > 0 && (
                                            <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md'>
                                                -{Math.round(product.discountPercentage)}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className={`flex-1 ${viewMode === 'grid' ? '' : 'min-w-0'}`}>
                                        <h2 className={`font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 ${
                                            viewMode === 'grid' ? 'text-lg mb-2' : 'text-xl mb-3'
                                        }`}>
                                            {product.title}
                                        </h2>
                                        
                                        {/* Description (only in list view) */}
                                        {viewMode === 'list' && (
                                            <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        {/* Rating */}
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='flex items-center gap-1'>
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <FaStar 
                                                        key={starIndex}
                                                        className={`text-sm ${
                                                            starIndex < Math.floor(product.rating) 
                                                                ? 'text-yellow-500' 
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className='text-sm text-gray-600 font-medium'>
                                                ({product.rating})
                                            </span>
                                        </div>
                                        
                                        {/* Price */}
                                        <div className='flex items-center gap-3'>
                                            <span className={`font-black text-blue-600 ${
                                                viewMode === 'grid' ? 'text-xl' : 'text-2xl'
                                            }`}>
                                                ${product.price}
                                            </span>
                                            {product.discountPercentage > 0 && (
                                                <span className={`text-gray-500 line-through font-medium ${
                                                    viewMode === 'grid' ? 'text-sm' : 'text-lg'
                                                }`}>
                                                    ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Stock Status */}
                                        <div className='mt-3'>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                product.stock > 10 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : product.stock > 0 
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.stock > 10 ? 'In Stock' : 
                                                 product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* No Products Found */
                    <div className='text-center py-16'>
                        <div className='bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto'>
                            <div className='text-8xl mb-6'>📦</div>
                            <h2 className='text-2xl font-bold text-gray-700 mb-4'>
                                No products found
                            </h2>
                            <p className='text-gray-600 mb-6'>
                                We couldn't find any products in the "{categoryName.replace(/-/g, ' ')}" category.
                            </p>
                            <Link 
                                href='/' 
                                className='inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                            >
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page