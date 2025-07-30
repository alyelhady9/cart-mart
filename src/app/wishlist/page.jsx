'use client'

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, updateNote, clearWishlist } from '../features/wishlistSlice';
import Link from 'next/link';
import Image from 'next/image';


const page = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems = [], notes = {} } = useSelector((state) => state.wishlist || {});
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from wishlist items
  const categories = [...new Set(wishlistItems.map(item => item.category))];

  // Filter and sort items
  const filteredItems = wishlistItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.addedAt) - new Date(a.addedAt);
        case 'oldest': return new Date(a.addedAt) - new Date(b.addedAt);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  const handleRemoveItem = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleNoteUpdate = (productId, note) => {
    dispatch(updateNote({ productId, note }));
  };

  const handleClearWishlist = () => {
      dispatch(clearWishlist());
    
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };
  if (wishlistItems.length === 0 ) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            {/* <HeartIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" /> */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items you love to see them here!</p>
            <Link 
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {/* <HeartSolidIcon className="h-8 w-8 text-red-500" /> */}
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button
              onClick={handleClearWishlist}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              {/* <TrashIcon className="h-4 w-4" /> */}
              Clear All
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {/* <Squares2X2Icon className="h-5 w-5" /> */}
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {/* <ListBulletIcon className="h-5 w-5" /> */}
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="relative">
                  <Link href={`/products/${item.id}`}>
                    <div className="aspect-square relative cursor-pointer">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* <HeartSolidIcon className="h-5 w-5 text-red-500" /> */}
                  </button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {/* <StarIcon className="h-4 w-4 text-yellow-400 fill-current" /> */}
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${calculateDiscountedPrice(item.price, item.discountPercentage).toFixed(2)}
                    </span>
                    {item.discountPercentage > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">${item.price}</span>
                        <span className="text-sm text-green-600 font-semibold">
                          -{item.discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>

                  <textarea
                    placeholder="Add a note..."
                    value={notes[item.id] || ''}
                    onChange={(e) => handleNoteUpdate(item.id, e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <Link href={`/products/${item.id}`}>
                    <div className="w-24 h-24 relative cursor-pointer flex-shrink-0">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </Link>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center">
                            {/* <StarIcon className="h-4 w-4 text-yellow-400 fill-current" /> */}
                            <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.category}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${calculateDiscountedPrice(item.price, item.discountPercentage).toFixed(2)}
                          </span>
                          {item.discountPercentage > 0 && (
                            <>
                              <span className="text-sm text-gray-500 line-through">${item.price}</span>
                              <span className="text-sm text-green-600 font-semibold">
                                -{item.discountPercentage}%
                              </span>
                            </>
                          )}
                        </div>

                        <textarea
                          placeholder="Add a note..."
                          value={notes[item.id] || ''}
                          onChange={(e) => handleNoteUpdate(item.id, e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {/* <HeartSolidIcon className="h-5 w-5" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && wishlistItems.length > 0 && (
          <div className="text-center py-16">
            {/* <FunnelIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" /> */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items match your filters</h3>
            <p className="text-gray-600">Try adjusting your category or sort preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;