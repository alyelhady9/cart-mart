

'use client'
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { addItem, openCart } from '../../features/cartSlice';
import { toggleAuthModal } from '@/app/features/openAuthModalSlice';
import Link from 'next/link';

import { addToWishlist, removeFromWishlist } from '@/app/features/wishlistSlice';


function page({params}) {
    const { id } = use(params)
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const dispatch = useDispatch();


    const isLoggedIn = useSelector((state) => state.auth.loggedIn);

//   const wishlistItems = useSelector((state) => state.items);
const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isLoggedIn) {

        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    } else {
        dispatch(toggleAuthModal());
    }
  };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/products?limit=0&skip=0');
                const data = await response.json();
                // Filter products based on the category parameter
                const foundProduct = data.products.find((product) => product.id === parseInt(id));
                setProduct(foundProduct);
                console.log(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct(); // Call the function to fetch products
        console.log(product);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4">Product Not Found</h1>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      quantity: 1
    }));
    dispatch(openCart()); // Optional: auto-open cart
  };
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">


                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-8 p-8">
                            {/* Image Section */}
                            <div className="">
                                <div className="">
                                    {/* Main Image */}
                                    <div className="mb-4 rounded-lg overflow-hidden bg-gray-50 p-4">
                                        <Image 
                                            width={500} 
                                            height={500} 
                                            alt={product.title} 
                                            src={product.images?.[selectedImage] || product.thumbnail} 
                                            className="w-full h-80 object-contain"
                                        />
                                    </div>
                                    
                                    {/* Thumbnail Gallery */}
                                    {product.images && product.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto">
                                            {product.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border transition-all ${
                                                        selectedImage === index 
                                                            ? 'border-blue-600' 
                                                            : 'border-gray-200 hover:border-yellow-500'
                                                    }`}
                                                >
                                                    <Image 
                                                        width={64} 
                                                        height={64} 
                                                        alt={`${product.title} ${index + 1}`} 
                                                        src={image} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Info Section */}
                            <div className="">
                                <div className="mb-6">
                                    <Link href={`/categories/${product.category}`}>
                                    <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full mb-3">
                                        {product.category}
                                    </span>
                                    </Link>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl font-bold text-blue-600">
                                            ${product.price}
                                        </span>
                                        {product.discountPercentage > 0 && (
                                            <span className="text-lg text-gray-500 line-through">
                                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    {product.discountPercentage > 0 && (
                                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                                            {product.discountPercentage}% OFF
                                        </span>
                                    )}
                                </div>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < Math.floor(product.rating)
                                                            ? 'text-yellow-500'
                                                            : 'text-gray-300'
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600 text-sm">
                                            {product.rating} ({product.reviews?.length || 0} reviews)
                                        </span>
                                    </div>
                                )}

                                {/* All Product Details */}
                                <div className="space-y-3 mb-6 text-sm">
                                    {product.brand && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Brand:</span>
                                            <span className="text-gray-600">{product.brand}</span>
                                        </div>
                                    )}
                                    {product.sku && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">SKU:</span>
                                            <span className="text-gray-600">{product.sku}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Stock:</span>
                                        <span className={`${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                                        </span>
                                    </div>
                                    {product.weight && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Weight:</span>
                                            <span className="text-gray-600">{product.weight}</span>
                                        </div>
                                    )}
                                    {product.dimensions && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Dimensions:</span>
                                            <span className="text-gray-600">
                                                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}
                                            </span>
                                        </div>
                                    )}
                                    {product.warrantyInformation && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Warranty:</span>
                                            <span className="text-gray-600">{product.warrantyInformation}</span>
                                        </div>
                                    )}
                                    {product.shippingInformation && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Shipping:</span>
                                            <span className="text-gray-600">{product.shippingInformation}</span>
                                        </div>
                                    )}
                                    {product.availabilityStatus && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Availability:</span>
                                            <span className="text-gray-600">{product.availabilityStatus}</span>
                                        </div>
                                    )}
                                    {product.returnPolicy && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Return Policy:</span>
                                            <span className="text-gray-600">{product.returnPolicy}</span>
                                        </div>
                                    )}
                                    {product.minimumOrderQuantity && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-700">Min Order:</span>
                                            <span className="text-gray-600">{product.minimumOrderQuantity}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 mb-6">
                                    <button 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                        disabled={product.stock === 0}
                                        onClick={handleAddToCart}
                                    >
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    <button 
                                        // className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                        onClick={handleWishlistToggle}
                                        className={`w-full  text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                                            isInWishlist 
                                              ? 'bg-red-500 border-red-500  hover:bg-red-700' 
                                              : 'bg-yellow-500 hover:bg-yellow-600'
                                          } `}
                                        
                                    >
                                                {isInWishlist ? (
                                                    <>
                                                    {/* <HeartSolidIcon className="h-5 w-5" /> */}
                                                    <span className="font-medium">Remove from Wishlist</span>
                                                    </>
                                                ) : (
                                                    <>
                                                    {/* <HeartIcon className="h-5 w-5" /> */}
                                                    <span className="font-medium">Add to Wishlist</span>
                                                    </>
                                                )}
                                    </button>
                                </div>

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div>
                                        <h3 className="font-medium text-gray-700 mb-2">Tags:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reviews Summary */}
                                {product.reviews && product.reviews.length > 0 && (
                                    <div className="mt-6 pt-6 border-t">
                                        <h3 className="font-medium text-gray-700 mb-3">Recent Reviews:</h3>
                                        <div className="space-y-3">
                                            {product.reviews.slice(0, 2).map((review, index) => (
                                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-sm">{review.reviewerName}</span>
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-3 h-3 ${
                                                                        i < review.rating
                                                                            ? 'text-yellow-500'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;