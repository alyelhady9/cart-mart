"use client";

import React from 'react';
import { FaSquareFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import apple from '../../../public/assets/logos/applePay.png'
import download1 from '../../../public/assets/logos/download1.png'
import download2 from '../../../public/assets/logos/download2.png'
import google from '../../../public/assets/logos/googlePay.png'
import mastercard from '../../../public/assets/logos/mastercard.png'
import paypal from '../../../public/assets/logos/payPal.png'
import visa from '../../../public/assets/logos/visa.webp'
import Link from 'next/link';
import Image from 'next/image';



export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 border-t  pt-8 pb-4 px-16 max-md:px-4 mt-12 ">
      <div className='w-full'>
        <div className='flex justify-between max-md:flex-col max-md:items-center max-md:text-center max-md:gap-4'>
          <div>
            <h1 className='text-xl pb-2 font-semibold'>
             
               Get Support

            </h1>
            <ul className='text-gray-700'>
               <Link href={'/contact'} ><li className='hover:underline py-2'>Help Center</li></Link>
               <Link href={'/contact'} ><li className='hover:underline py-2'>Check order status</li></Link>
               <Link href={'/contact'} ><li className='hover:underline py-2'>Report abuse</li></Link>
            </ul>
          </div>
          <div>
            <h1 className='text-xl pb-2 font-semibold'>
             
            Payments and protections

            </h1>
            <ul className='text-gray-700'>
               <Link href={'/contact'} ><li className='hover:underline py-2'>Safe and easy payments</li></Link>
               <Link href={'/contact'} ><li className='hover:underline py-2'>Money-back policy</li></Link>
               <Link href={'/contact'} ><li className='hover:underline py-2'>After-sales protections</li></Link>
            </ul>
          </div>
          <div>
            <h1 className='text-xl pb-2 font-semibold'>
             
              Tools & apps

            </h1>
            <ul className='text-gray-700'>
               <Link href={'/about'} ><li className='hover:underline py-2'>Security center</li></Link>
               <Link href={'/about'} ><li className='hover:underline py-2'>Site map</li></Link>
               <Link href={'/about'} ><li className='hover:underline py-2'>Developers</li></Link>
            </ul>
          </div>
          <div>
            <h1 className='text-xl pb-2 font-semibold'>
             
            Get to know us

            </h1>
            <ul className='text-gray-700'>
               <Link href={'/about'} ><li className='hover:underline py-2'>News</li></Link>
               <Link href={'/about'} ><li className='hover:underline py-2'>Careers</li></Link>
               <Link href={'/about'} ><li className='hover:underline py-2'>Investors</li></Link>
            </ul>
          </div>
        </div>


        <div className='py-6 max-md:py-0'>
          <div className='flex gap-4 flex-wrap justify-center items-center py-4'>
            <Image src={apple} alt='apple pay' width={60} height={30} />
            <Image src={google} alt='google pay' width={60} height={30} />
            <Image src={mastercard} alt='mastercard' width={60} height={30} />
            <Image src={visa} alt='visa' width={60} height={30} />
            <Image src={paypal} alt='paypal' width={60} height={30} />
          </div>
        </div>



        <div className='flex max-md:flex-col-reverse max-md:items-center max-md:text-center max-md:gap-5 justify-between items-center py-2' >
          <div> Cart-mart © {year}. All rights reserved. </div>
          <div className='text-gray-600 text-4xl flex gap-4 justify-evenly'>
            <Link target='blank' href={'https://facebook.com'} ><FaSquareFacebook className=' hover:text-blue-700 cursor-pointer'/></Link>
            <Link target='blank' href={'https://facebook.com'} ><FaInstagram className=' hover:text-pink-700 cursor-pointer'/></Link>
            <Link target='blank' href={'https://facebook.com'} ><FaLinkedin className=' hover:text-blue-700 cursor-pointer'/></Link>
            <Link target='blank' href={'https://facebook.com'} ><FaXTwitter className=' hover:text-black cursor-pointer'/></Link>
            <Link target='blank' href={'https://facebook.com'} ><FaYoutube className=' hover:text-red-500 cursor-pointer'/></Link>


          </div>

        </div>



      </div>
    </footer>
  );
}