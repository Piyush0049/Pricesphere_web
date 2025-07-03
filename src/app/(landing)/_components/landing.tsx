"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PriceSpherePage = () => {
  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-between relative overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Header */}
      <header className="fixed top-0 z-50 w-full px-3 md:px-5 lg:px-28 py-2 flex justify-between items-center bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-md rounded-b-xl">
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
        
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-4 py-2 text-sm md:text-base text-white hover:text-orange-400 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/login" 
            className="px-4 py-2 text-sm md:text-base bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full max-w-7xl px-4 md:px-8 lg:px-16 mt-32 mb-16">
        <main className="text-center md:border-[3px] md:border-gray-600/30 py-16 px-4 md:px-16 lg:px-28 rounded-2xl bg-transparent md:bg-opacity-80 backdrop-filter md:backdrop-blur-xl hover:shadow-lg transition-all">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[850] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700">
            <span>Find Exclusive Deals</span>
            <br />
            <span className="text-transparent bg-clip-text block bg-gradient-to-r from-orange-300 to-orange-600">
              From Best Online Stores
            </span>
          </h1>
          
          <p className="mt-6 mb-10 text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
            Save <span className="text-white font-bold">time</span> and{" "}
            <span className="text-white font-bold">money</span> with{" "}
            <span className="text-orange-500 font-bold">PriceSphere</span>&apos;s best
            deals across the country.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/login" 
              className="px-5 py-1.5 sm:px-8 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 text-lg"
            >
              Start Now
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PriceSpherePage;
