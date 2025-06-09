"use client"
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react'


import Image from 'next/image';


import img1 from "../../../public/assets/categoreis/beauty.jpg"
import img2 from "../../../public/assets/categoreis/frag.jpg"
import img3 from "../../../public/assets/categoreis/furniture.jpg"
import img4 from "../../../public/assets/categoreis/groce.jpg"
import img5 from "../../../public/assets/categoreis/homedecorations.jpg"
import img6 from "../../../public/assets/categoreis/kitchenaccessories.webp"
import img7 from "../../../public/assets/categoreis/laptop.webp"
import img8 from "../../../public/assets/categoreis/maleshirt.png"
import img9 from "../../../public/assets/categoreis/maleshoes.jpg"
import img10 from "../../../public/assets/categoreis/malewatch.jpg"
import img11 from "../../../public/assets/categoreis/mobileaccesories.jpg"
import img12 from "../../../public/assets/categoreis/motorcycle.jpg"
import img13 from "../../../public/assets/categoreis/skincare.png"
import img14 from "../../../public/assets/categoreis/smartphone.jpg"
import img15 from "../../../public/assets/categoreis/spotsaccssesories.jpeg"
import img24 from "../../../public/assets/categoreis/sunglasses.jpg"
import img16 from "../../../public/assets/categoreis/taplet.jpg"
import img17 from "../../../public/assets/categoreis/tops.jpg"
import img18 from "../../../public/assets/categoreis/car.jpg"
import img19 from "../../../public/assets/categoreis/womensbag.jpg"
import img20 from "../../../public/assets/categoreis/drss.jpg"
import img21 from "../../../public/assets/categoreis/jewellrey.jpg"
import img22 from "../../../public/assets/categoreis/womenboots.webp"
import img23 from "../../../public/assets/categoreis/womenwatch.jpg"












function page() {

 const [categories , setCategories ] = useState([])
    
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
  
  return (

    <div className='w-full flex justify-center p-8'>
      <div className='w-8/12 max-md:w-10/12 flex justify-center'>

        <div className='grid grid-cols-4 max-md:grid-cols-2 w-full gap-8'>
          
            {
              categories.map ((c,i) =>(
                
                
                <div key={i} >
                  <Link href={`/categories/${c.name}`}>
                    <div className='flex flex-col items-center justify-center cursor-pointer '>

                              <Image className='rounded-full border-[1px] border-gray-300 p-4'
                              src={
                                c.name === 'Beauty'? img1 :
                                c.name === 'Fragrances'? img2 :
                                c.name === 'Furniture'? img3 :
                                c.name === 'Groceries'? img4 :
                                c.name === 'Home Decoration'? img5 :
                                c.name === 'Kitchen Accessories'? img6 :
                                c.name === 'Laptops' ? img7 :
                                c.name === 'Mens Shirts' ? img8 :
                                c.name === 'Mens Shoes' ? img9 :
                                c.name === 'Mens Watches' ? img10 :
                                c.name === 'Mobile Accessories' ? img11 :
                                c.name === 'Motorcycle' ? img12 :
                                c.name === 'Skin Care' ? img13 :
                                c.name === 'Smartphones' ? img14 :
                                c.name === 'Sports Accessories' ? img15 :
                                c.name === 'Sunglasses' ? img24 :
                                c.name === 'Tablets' ? img16 :
                                c.name === 'Tops' ? img17 :
                                c.name === 'Vehicle' ? img18 :
                                c.name === 'Womens Bags' ? img19 :
                                c.name === 'Womens Dresses' ? img20 :
                                c.name === 'Womens Jewellery' ? img21 :
                                c.name === 'Womens Shoes' ? img22 :
                                c.name === 'Womens Watches' ? img23 :
                                img2
                              } 
                              alt="car" width={200} height={200} />



                                <p className='mt-4 text-lg'>
                                  {
                                    c.name === "Vehicle" || c.name === "Motorcycle" ?
                                      
                                    c.name + "s": 
                                    c.name
                                  
                                  
                                  
                                  }
                                </p>
                          </div>
                      </Link>
                          
                          </div>
                        
                      
                        
                    
                  
                 ))
            }
        </div>
      </div>
    </div>
  )
}

export default page