'use client'

import { useState } from 'react'
import { Heart, Star, MapPin, Clock } from "lucide-react"
import Image from "next/image"


const hotels = [
    {
      id: 1,
      name: "Castello Casole Hotel",
      location: "New York City",
      rating: 4,
      reviews: 3,
      price: 159.00,
      image: "/castello-casole.jpeg"
    },
    {
      id: 2,
      name: "Hotel WBF Hommachi",
      location: "Los Angeles",
      rating: 3,
      reviews: 3,
      price: 212.00,
      image: "/Hotel WBF Hommachi.jpeg"
    },
    {
      id: 3,
      name: "Vnahomes Aparhotel",
      location: "San Francisco",
      rating: 5,
      reviews: 4,
      price: 159.00,
      image: "/Vnahomes Aparhotel.jpeg"
    }
  ]

const tours = [
  {
    id: 1,
    name: "Two Hour Walking Tour of Manhattan",
    location: "Los Anglese",
    rating: 5,
    reviews: 3,
    price: 190.80,
    originalPrice: 212.00,
    duration: "10 hours",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    id: 2,
    name: "American Parks Trail end Rapid City",
    location: "Nevada",
    rating: 5,
    reviews: 3,
    price: 159.00,
    duration: "8 hour",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    id: 3,
    name: "Northern California Summer 2019",
    location: "San Francisco",
    rating: 5,
    reviews: 3,
    price: 159.00,
    duration: "5 days",
    image: "/placeholder.svg?height=300&width=400"
  }
]

const categories = ["Hotel", "Tour", "Activity", "Rental", "Car"]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("Hotel")

  const renderContent = () => {
    if (selectedCategory === "Hotel") {
      return hotels.map((hotel) => (
        <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="relative overflow-hidden group">
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < hotel.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
            <p className="text-gray-600 mb-4 flex">{hotel.location}</p>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {hotel.rating}/5 · Excellent ({hotel.reviews} Reviews)
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">From:</span>
                <span className="text-xl font-bold ml-1">${hotel.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">/night</span>
              </div>
            </div>
          </div>
        </div>
      ))
    } else if (selectedCategory === "Tour") {
      return tours.map((tour) => (
        <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="relative overflow-hidden group">
            <Image
              src={tour.image}
              alt={tour.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            {tour.originalPrice && (
              <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                -20%
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{tour.location}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < tour.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({tour.reviews} Reviews)</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                {tour.originalPrice && (
                  <span className="text-sm text-gray-500 line-through mr-2">${tour.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-xl font-bold">${tour.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{tour.duration}</span>
              </div>
            </div>
          </div>
        </div>
      ))
    } else {
      return <div className="col-span-full text-center text-gray-500">No content available for this category yet.</div>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Recommended for you</h1>
      <div className="flex justify-center gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              category === selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderContent()}
      </div>
    </div>
  )
} 
