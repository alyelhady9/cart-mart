'use client'
import React, { useState, useEffect } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { toggleAuthModal } from '../features/openAuthModalSlice'
import { FaTimes, FaEye, FaGoogle, FaFacebook,FaEyeSlash } from 'react-icons/fa';
import { setUserName , login, hydrateAuth } from '../features/authSlice';
function AuthModal() {
    
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [hasAccount , setHasAccount] = useState(true)
    const isOpen = useSelector(state => state.authModal.isOpen)
    const handleClose = () => {dispatch(toggleAuthModal())}
    const toggleShowPassword = () => setShowPassword(!showPassword)
    const toggleHasAccount = () => setHasAccount(!hasAccount)
    
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user , setUser] = useState ("")
   
    const handleSubmit = (e) => { 
       e.preventDefault();
       dispatch (setUserName(user))
       setUser("")
       dispatch (login())
       setPassword("")
       setName("")
        handleClose()
    }
    useEffect(() => {
        dispatch(hydrateAuth());
      }, [dispatch])
  return (
   
    <>
    {
        isOpen && (
            <> 
           
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
        <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
            {
                hasAccount ? (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                    <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
                </div>

                ) : (

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>

                    </div>
                )
           }
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <FaTimes className="text-gray-500 text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
        
          {/* user name Field */}
            {
               !hasAccount &&
                <div className='mb-4'>
                <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={ (e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200"
                />

                 </div>
            }

          {/* Email Field */}
          <div className="mb-4">
            <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <div className="relative">
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200"
              />
              <button onClick={toggleShowPassword} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">

                {
                    showPassword ? (
                        <FaEyeSlash />
                        
                    ): (
                        <FaEye />
                        
                    )
                }
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            {
                hasAccount &&
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
                </button>
            }
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
            Sign In
          </button>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
                {
                    !hasAccount ? (

                        <span>
                             Already have an account 
                        </span>
                    ) : ( 

                        <span>
                             Don't have an account? 
                         </span>
                   )
                }


              <button onClick={toggleHasAccount} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors ml-1">
                {
                    !hasAccount ? (
                        
                        <span>
                            Sign in
                        </span>
                    ): (
                        
                        <span>
                            Sign Up
                        </span>
                )
                }
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
                </>
        )
        
    }
    </>
  )
}

export default AuthModal