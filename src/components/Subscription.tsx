"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function Subscription() {
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg my-20 border dark:border-white ">
      <div className="relative w-full md:w-1/2 h-80 md:h-auto">
        <Image
          src="/subscription-image.jpeg"
          alt="Aerial view of a tropical beach with palm trees and a seaplane landing on turquoise water"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="w-full md:w-1/2 p-16 bg-white flex flex-col justify-center dark:bg-black ">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800   dark:text-gray-300">
          Get special offers, and more from Traveler
        </h2>
        <p className="text-lg text-gray-600  mb-6 dark:text-gray-200">
          Subscribe to see secret deals prices drop the moment you sign up!
        </p>
        {message ? <p className="text-green-700">{message}</p>:null}
        {errorMessage ? <p className="text-red-600">{errorMessage}</p>:null}
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
           if(email === ""){
             setErrorMessage('Email Give Proper')
             return;
           }
            const payload = {
              email,
            };
            const response = await axios.post("/api/subscribe", payload);
            if (response?.data?.error) {
              setErrorMessage(response?.data?.error);
              setMessage("")
              setEmail('');
            }else{
              setEmail('');
              setMessage("Subscribe Done! Thank For Subscribe")
              setErrorMessage('')
            }
            console.log(response)
          }}
        >
          <div className="relative">
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email Address"
              className="w-full pl-4 pr-20 py-3 text-lg  rounded-full border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-gray-600 dark:text-gray-300 dark:border-gray-300"
            />
            <Button
              type="submit"
              className="absolute right-0 top-0 bottom-4 px-6 bg-blue-600 hover:bg-blue-700 text-white dark:text-white font-semibold rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Subscribe
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
