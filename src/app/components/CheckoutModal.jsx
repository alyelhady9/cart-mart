'use client'
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { toggleCheckout } from '../features/checkoutSlice'
import { useState } from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import { closeCart } from '../features/cartSlice'
function CheckoutModal() {
    const isOpen = useSelector(state => state.checkout.opened)
    const dispatch = useDispatch()

    const handleCheckout = () => { 
        dispatch(toggleCheckout()) 
        handleOrderCompletion()
        dispatch(closeCart())
    }


    const [orderCompleted , setOrderCompleted] = useState(false)
    const handleOrderCompletion = () => { setOrderCompleted(!orderCompleted)}
  return (
      
            
        
                isOpen&&
      <div onClick={handleCheckout} className='fixed z-[60] inset-0  bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center  p-4'>
     
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-8 w-full max-w-md">
            
            {
                !orderCompleted? ( <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
                    <div className="space-y-4 mb-6">
                    <div>
                    <label className="block text-gray-700 mb-2">Delivery Address</label>
                    <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e51f1f] focus:border-transparent"
                    rows="3"
                    placeholder="Enter your full address"
                    required
                    />
                    </div>
                        
                        <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input 
                        type="tel" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e51f1f] focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                        />
                        </div>
                        
                        <div>
                        <label className="block text-gray-700 mb-2">Payment Method</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e51f1f] focus:border-transparent">
                        <option>Cash on Delivery</option>
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        </select>
                        </div>
                        </div>
                        
                        <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Amount:</span>
                        {/* <span className="text-[#44ce1b]">${getTotalPrice()}</span> */}
                        </div>
                        </div>
                        
                        <div className="flex space-x-4">
                        <button 
                        onClick ={handleCheckout}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                        Cancel
                        </button>
                        <button 
                          onClick={handleOrderCompletion}
                        className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                        >
                        Place Order
                        </button>
                    </div>

                    </> ) : (

                        <div className='w-full  text-xl text-center text-gray-600 flex justify-center items-center flex-col  h-full bg-white rounded-2xl p-4'>


                            <div className='text-[8rem] mb-4'>
                                <CiDeliveryTruck/>
                            </div>
                            <h2 className='mb-4'>The order has been placed successfully!</h2>
                            <p className='w-full text-sm mb-4'>Thank you for your order. We will contact you soon.</p>
                            <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                                Close
                            </button>
                        </div>
                    )
                }

        </div>
        
        </div>
           
        
    )
}

export default CheckoutModal
