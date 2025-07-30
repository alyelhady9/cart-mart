import React from 'react'

function CardSkeletons() {
    const placeholders = []
for (let i = 1; i <= 7; i++) { 
    placeholders.push(i)
}
console.log(placeholders)


  return (
    placeholders.map ((p) => (

        <div key={p} className="flex-none w-64 bg-white rounded-2xl shadow-md border border-gray-100 relative overflow-hidden animate-pulse">
      {/* Discount Badge Skeleton */}
      <div className="absolute top-3 right-3 z-20 bg-gray-200 rounded-full h-6 w-16"></div>

      {/* Product Image Container Skeleton */}
      <div className="relative bg-gray-100 rounded-t-2xl h-48">
        <div className="w-full h-full bg-gray-200"></div>
      </div>
      
      {/* Product Info Skeleton */}
      <div className="p-5">
        {/* Title Skeleton */}
        <div className="mb-2">
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-2/4"></div>
        </div>
        
        
        
        {/* Price Section Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="bg-gray-200 rounded-full h-6 w-10"></div>
        </div>
      </div>
    </div>
))
  )
}

export default CardSkeletons