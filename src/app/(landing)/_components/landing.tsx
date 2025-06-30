"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { joinWaitingList } from "@/actions/user_action";
import Image from "next/image"; // Add this import

const PriceSpherePage = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleWait = async (email: string) => {
    setLoading(true);
    const res = await joinWaitingList(email);
    setLoading(false);
    if (res.success) {
      toast.success("You are all set to go!", {
        style: {
          backgroundColor: '#111827',
          color: 'orange',
          fontFamily: 'Poppins, sans-serif',
          padding: '16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
        },
        icon: (
          <svg
            className="w-6 h-6 mr-2 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L19 7" />
          </svg>
        ),
      });
    } else {
      console.log(res);
      toast.error(res.message || "Something went wrong", {
        style: {
          backgroundColor: '#111827',
          color: 'orange',
          fontFamily: 'Poppins, sans-serif',
          padding: '16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
        },
        icon: (
          <svg
            className="w-6 h-6 mr-2 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      handleWait(inputRef.current.value);
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <header className="fixed top-0 z-50 w-full px-3 md:px-5 lg:px-28 py-2 flex justify-between items-center bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-md rounded-b-xl">
        // Replace the img element with Next.js Image component
        <div className="flex items-center">
          <Image 
            src="/assets/logo.png" 
            alt="PriceSphere Logo" 
            width={56} 
            height={56} 
            className="h-14 w-auto" 
          />
          <div className="text-lg md:text-xl hidden md:block lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 transition-all">
            PriceSphere
          </div>
        </div>
        
        // Fix the unescaped entity
        <p className="mt-4 mb-10 text-base md:text-lg text-gray-300">
          Save <span className="text-white font-bold">time</span> and{" "}
          <span className="text-white font-bold">money</span> with{" "}
          <span className="text-orange-500 font-bold">PriceSphere</span>&apos;s best
          deals across the country.
        </p>
        <button className="bg-transparent text-sm md:text-lg border-2 border-orange-500 lg:text-[17px] text-transparent bg-clip-text block bg-gradient-to-r from-orange-300 to-orange-600 hover:to-orange-600 py-1 lg:py-1 px-3 lg:px-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
          Get Early Access
        </button>

      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute hidden md:block top-10 left-10 w-72 h-72 bg-gradient-to-tr from-teal-500 to-teal-600 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute hidden md:block bottom-24 right-16 w-96 h-96 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-full blur-3xl opacity-30"></div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-orange-500 blur-[0.5px] opacity-20 md:opacity-30 font-bold text-sm bg-gray-800 px-2 py-1 rounded-full animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            {Math.floor(Math.random() * 50 + 10)}% OFF
          </div>
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute blur-[1px] opacity-20 md:opacity-30 text-blue-500 animate-float text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            {["🛍️", "💸", "🛒", "🏷️"][Math.floor(Math.random() * 4)]}
          </div>
        ))}

        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-lg animate-flicker"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          ></div>
        ))}

        <div className="absolute hidden md:block top-5 right-1/4 w-60 h-60 bg-gradient-to-tl from-pink-500 to-purple-700 rounded-full blur-2xl opacity-25 animate-spin-slow"></div>
        <div className="absolute hidden md:block bottom-12 left-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-2xl opacity-20 animate-float"></div>
        <div className="absolute hidden md:block top-64 right-10 w-80 h-80 bg-gradient-to-br from-red-500 to-orange-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute hidden md:block bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-green-400 to-teal-700 rounded-lg blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute hidden md:block top-40 right-1/4 w-72 h-72 bg-gradient-to-tl from-yellow-500 to-orange-800 rounded-lg blur-[100px] opacity-15 animate-spin-slow"></div>
      </div>

      <div>
        <main className="text-center md:border-[3px] md:border-gray-600 mb-80 py-16 px-4 md:px-16 lg:px-28 md:pt-16 md:pb-28  rounded-2xl mt-32 bg-transparent md:bg-opacity-80 backdrop-filter md:backdrop-blur-xl hover:shadow-lg transition-all">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700">
            <span>Find Exclusive Deals  </span>
            <br />
            <span className=" text-transparent bg-clip-text block bg-gradient-to-r from-orange-300 to-orange-600">
              From Best Online Stores.
            </span>
          </h1>
          <p className="mt-4 mb-10 text-base md:text-lg text-gray-300">
            Save <span className="text-white font-bold">time</span> and{" "}
            <span className="text-white font-bold">money</span> with{" "}
            <span className="text-orange-500 font-bold">PriceSphere</span>'s best
            deals across the country.
          </p>
          <div className="mt-3 flex font-poppins justify-center items-center">
            <form className="relative w-full flex max-w-lg" onSubmit={handleSubmit}>
              <span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-orange-500 font-medium text-[12px] md:text-base">
                pricesphere.in/
              </span>
              <input
                type="email"
                ref={inputRef}
                required
                className="w-full py-3 pl-28 sm:pl-44 pr-14 bg-gray-800 text-gray-200 rounded-full text-[13px] placeholder:text-[13px] md:text-base md:placeholder:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="eg. example@gmail.com"
              />
              <button
                type="submit"
                className="group absolute top-1/2 transform text-sm md:text-base -translate-y-1/2 right-0 bg-transparent text-white flex items-center justify-center gap-2 px-[14px] md:px-5 py-[14px] font-extrabold rounded-full transition"
              >
                {loading ? (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-[2px] rounded-full border-t-transparent border-r-transparent"></div>
                ) : (
                  <span className="absolute right-4 top-[11px] transform -translate-y-1/2 text-orange-500 text-2xl cursor-pointer">
                    &rarr;
                  </span>
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriceSpherePage;
