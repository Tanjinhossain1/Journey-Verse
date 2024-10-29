'use client'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg my-20 border">
      <div className="relative w-full md:w-1/2 h-80 md:h-auto">
        <Image
          src="/subscription-image.jpeg"
          alt="Aerial view of a tropical beach with palm trees and a seaplane landing on turquoise water"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="w-full md:w-1/2 p-16 bg-white flex flex-col justify-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Get special offers, and more from Traveler
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Subscribe to see secret deals prices drop the moment you sign up!
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full pl-4 pr-20 py-3 text-lg rounded-full border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-gray-600"
            />
            <Button
              type="submit"
              className="absolute right-0 top-0 bottom-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Subscribe
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}