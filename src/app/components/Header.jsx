


'use client';

import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaBars, FaTimes, FaRegStar,FaStar} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, hydrateCart } from '../features/cartSlice';
import { toggleAuthModal } from '../features/openAuthModalSlice';
import { logout } from '../features/authSlice';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import Link from 'next/link';
import Image from 'next/image';
import CategoryDropdown from './CategoryDropdown';

function Header() {
    
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        const fetchCategories = async (i) => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                const uniqueCategories = data
                setCategories(uniqueCategories);
                console.log(data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            const searchProducts = async () => {
                const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await response.json();
                setProducts(data.products);
            };
            searchProducts();
        } else {
            setProducts([]);
        }
    }, [query]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };
    
    const closeSearch = () => {
        setSearchOpen(false);
    }






        const dispatch = useDispatch();
        const { totalItems } = useSelector(state => state.cart);
      
        const handleClick = () => {
          dispatch(toggleCart());
        };
    
        const dispatchModal = useDispatch()
        const ToggleAuthModal = () => { 
            dispatchModal(toggleAuthModal())
        }
        const isLoggedIn = useSelector((state) => state.auth.loggedIn);
        const userNameFull = useSelector ((state) => state.auth.userName)
        const userName = String(userNameFull).indexOf('@') > -1 
        ? String(userNameFull).substring(0, String(userNameFull).indexOf('@'))
        : userNameFull;
        useEffect(() => {
            dispatch(hydrateCart());
          }, [dispatch])




        const handleLogout = () => {
            dispatch(logout());
        }
    return (
        <header className='w-full relative bg-white shadow-md'>
            {/* Main Header */}
            <div className='flex justify-between w-full items-center px-6 max-md:px-4 py-4 bg-gradient-to-r from-white to-blue-50'>
                {/* Logo & Mobile Menu */}
                <div className='flex items-center w-3/12 min-w-fit'>
                    <div className={`md:hidden p-2 text-xl cursor-pointer transition-all hover:bg-gray-100 rounded-lg ${searchOpen && 'hidden'}`} onClick={toggleMenu}>
                        {menuOpen ? <FaTimes aria-label="Close Menu" className="text-gray-700" /> : <FaBars aria-label="Open Menu" className="text-gray-700" />}
                    </div>
                    <Link href={'/'} onClick={closeSearch} className="transition-transform hover:scale-105">
                        <div className='text-3xl font-black flex gap-1 tracking-tight'>
                            <p className='text-blue-600 drop-shadow-sm'>Cart</p>
                            <p className='text-yellow-500 drop-shadow-sm'>Mart</p>
                        </div>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className={`flex w-8/12 max-lg:w-7/12 justify-center ${!searchOpen ? 'max-md:hidden' : "max-md:w-8/12"}`}>
                    <div className="relative w-full max-w-lg  group">
                        <input 
                            placeholder='Search for products, brands and more...' 
                            className='w-full rounded-full focus:outline-none placeholder:text-gray-400 placeholder:text-sm bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-3 pr-12 transition-all duration-200 shadow-sm' 
                            type="search" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchOpen(true); 
                            }}
                        />
                        {query.length > 0 ? (
                            <Link 
                                onClick={toggleSearch} 
                                href={
                                    query.length > 0 &&
                                    '/products'
                                } 
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 text-white text-lg font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg'
                            >
                                <IoSearchOutline />
                            </Link>
                        ) : (
                            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 text-white text-lg font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg'>
                                <IoSearchOutline />
                            </button>
                        )}
                    </div>
                </div>  

                {/* User Actions */}
                <div className={`flex items-center gap-3 w-3/12 max-lg:w-7/12 justify-end max-md:w-6/12 max-sm:w-7/12 ${searchOpen && 'max-md:hidden'}`}>
                    <div className={`md:hidden text-xl cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all ${searchOpen ? 'hidden' : 'flex'}`} onClick={toggleSearch}>
                        <IoSearchOutline aria-label="Open Search" className="text-gray-700" />
                    </div>
                    
                    <div className={`md:flex ${searchOpen ? 'max-md:hidden' : 'flex'} items-center gap-3`}>
                        {
                            !isLoggedIn ? ( 

                                <button 
                                onClick={ToggleAuthModal} 
                                className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                >
                                Sign in
                            </button>
            ) : (
                <div className='max-lg:text-[10px]'>Hi, <span className='max-md:block'>{userName}</span></div>
            )
                
            }
            {
                isLoggedIn && 
                <button 
                onClick={handleLogout} 
                className='max-md:hidden bg-gradient-to-r text-sm from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                >
                Log Out
            </button>
            }
                        
                            {
                                isLoggedIn && 
                                <Link  href={'/wishlist'}>
                                    <div className='text-xl p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all'>
                                        <FaRegStar className='text-gray-500 ' />
                                    </div>
                                </Link>
                            }
                        <div  onClick={handleClick} className='relative'>
                            <div className='text-2xl p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all' onClick={closeSearch}>
                                <IoCartOutline aria-label="Cart" className="text-gray-700" />
                            </div>
                            {/* Cart Badge - you can add cart count here */}
                            {totalItems > 0 && (
        
                                
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                {totalItems > 99 ? '99+' : totalItems}
                                
                            </span>
      )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className={`flex justify-center py-4 items-center w-full bg-white border-t border-gray-100 ${menuOpen ? 'flex' : 'hidden'} md:flex transition-all duration-300 ease-in-out shadow-sm`}>
                <div className='flex flex-col md:flex-row gap-6 md:gap-12 w-full md:w-10/12 justify-center items-center'>
                    <Link 
                        onClick={toggleMenu} 
                        href={'/'} 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 py-2 px-4 rounded-lg hover:bg-blue-50 relative group"
                    >
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    
                    <div className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 py-2 px-4 rounded-lg hover:bg-blue-50">
                        <CategoryDropdown categories={categories} />
                    </div>
                    
                    <Link 
                        onClick={toggleMenu}  
                        href={'/about'} 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 py-2 px-4 rounded-lg hover:bg-blue-50 relative group"
                    >
                        About us
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    
                    <Link 
                        onClick={toggleMenu}  
                        href={'/contact'} 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 py-2 px-4 rounded-lg hover:bg-blue-50 relative group"
                    >
                        Contact us
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {

                        isLoggedIn && 
                        <button 
                        onClick={handleLogout} 
                        className='hidden max-sm:block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        >
                        Log Out
                         </button>
                    }
                </div>
            </nav>

            {/* Search Results Overlay */}
            {searchOpen && query.length > 0 && (
    <div className='fixed inset-0 top-[5rem] max-md:top-[4.5rem] bg-black bg-opacity-60 backdrop-blur-sm flex w-full justify-center items-start z-50' onClick={toggleSearch}>
        <div className='bg-white rounded-2xl shadow-2xl m-4 p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden'>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
                <button 
                    onClick={toggleSearch}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                    <FaTimes className="text-gray-500" />
                </button>
            </div>
            
            {products.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[65vh] pr-2'>
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} onClick={toggleSearch}>
                            <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer group">
                                <div className="relative overflow-hidden rounded-lg mb-3">
                                    <Image 
                                        src={product.thumbnail} 
                                        alt={product.title} 
                                        width={200} 
                                        height={200} 
                                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1 text-sm line-clamp-2">{product.title}</h3>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                <p className="text-lg font-bold text-blue-600">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No items found</h4>
                    <p className="text-gray-500 text-sm">
                        Try searching with different keywords or check your spelling
                    </p>
                </div>
            )}
        </div>
    </div>
)}
        </header>
    );
}

export default Header;