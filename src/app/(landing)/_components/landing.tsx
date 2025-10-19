"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Mic,
  ShoppingBag,
  ArrowRight,
  Check,
  Sparkles,
  Zap
} from "lucide-react";

const PriceSpherePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Enhanced Animated Background with Glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-600/30 to-orange-500/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-600/30 to-blue-500/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-full blur-[120px] sm:blur-[140px] animate-pulse" style={{ animationDelay: "4s" }}></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148_163_184/0.05)_1px,_transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      {/* Enhanced Glassmorphic Header */}
      <header className="fixed top-0 z-50 w-full px-4 sm:px-6 md:px-12 lg:px-20 py-3 sm:py-4">
        <div
          className="max-w-7xl mx-auto bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl shadow-black/20"
          style={{
            transform: `translateY(${Math.min(scrollY / 10, 10)}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-lg group-hover:bg-orange-500/30 transition-all duration-300"></div>
                <Image
                  src="/assets/logo.png"
                  alt="PriceSphere"
                  width={40}
                  height={40}
                  className="h-9 w-9 sm:h-11 sm:w-11 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
              </div>
              <span className="text-base sm:text-xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                PriceSphere
              </span>
            </Link>

            <Link
              href="/login"
              className="group relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <span className="relative z-10 text-white font-semibold flex items-center gap-2">
                Get Started
                <ArrowRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 sm:pt-36 md:pt-44 min-h-screen flex flex-col justify-center items-center pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            {/* Enhanced Badge with Glassmorphism */}
            <div
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500/10 via-orange-600/10 to-orange-500/10 backdrop-blur-xl border border-orange-500/30 mb-6 sm:mb-8 shadow-lg shadow-orange-500/10"
            >
              <div className="relative">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 animate-spin" style={{ animationDuration: "4s" }} />
                <div className="absolute inset-0 bg-orange-400/20 blur-md"></div>
              </div>
              <span className="text-xs sm:text-sm text-orange-300 font-bold">Smart Price Comparison • Image & Voice Search</span>
            </div>

            {/* Enhanced Heading with Text Animation */}
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[94px] font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              <span className="block text-white mb-1 sm:mb-2 animate-fade-in-up">
                Compare Prices
              </span>
              <span
                className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-fade-in-up tracking-tighter"
                style={{ animationDelay: "0.2s" }}
              >
                Smarter & Faster
              </span>
            </h1>


            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed font-light px-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              Search by <span className="font-bold text-orange-400 relative inline-block group">
                image
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span> or <span className="font-bold text-orange-400 relative inline-block group">
                voice
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>.
              Compare prices from <span className="font-bold text-white">Amazon, Flipkart, Ajio & Myntra</span> in seconds.
            </p>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center mb-10 sm:mb-12 md:mb-16 px-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <Link
                href="/login"
                className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5 overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_100%] animate-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative z-10 text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 sm:gap-3">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Start Comparing Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-2xl shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-all duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Glassmorphism */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 px-4">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                How PriceSphere Works
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4">
              Three unique ways to find the best deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Image Search */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-orange-500/30">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">Image Search</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  Upload a product image and instantly find matching items across all platforms with accurate price comparisons.
                </p>

                <div className="flex items-center gap-2 text-orange-400 text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                  <span>Try it now</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 2: Voice Search */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/30">
                    <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">Voice Search</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  Simply speak what you&apos;re looking for. Our AI-powered voice recognition finds the best deals hands-free.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                  <span>Try it now</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 3: Multi-Platform */}
            <div className="group relative md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-purple-500/30">
                    <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">Multi-Platform</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  Get real-time prices from Amazon, Flipkart, Ajio, and Myntra all in one place. Save time and money.
                </p>

                <div className="flex items-center gap-2 text-purple-400 text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                  <span>Try it now</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-4">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Simple. Fast. Smart.
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 px-4">Get the best deals in 3 easy steps</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                num: 1,
                title: "Search Your Way",
                desc: "Type, upload an image, or use your voice to search for any product you want to buy.",
                color: "orange",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-500/10 to-orange-600/5",
                borderColor: "border-orange-500/30",
                hoverBorder: "group-hover:border-orange-500/60"
              },
              {
                num: 2,
                title: "Compare Instantly",
                desc: "View prices from Amazon, Flipkart, Ajio, and Myntra side-by-side in real-time.",
                color: "blue",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-500/10 to-blue-600/5",
                borderColor: "border-blue-500/30",
                hoverBorder: "group-hover:border-blue-500/60"
              },
              {
                num: 3,
                title: "Buy & Save",
                desc: "Click on the best deal and purchase directly. Save up to 60% on every shopping trip.",
                color: "purple",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-500/10 to-purple-600/5",
                borderColor: "border-purple-500/30",
                hoverBorder: "group-hover:border-purple-500/60"
              }
            ].map((step) => (
              <div
                key={step.num}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.bgGradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                {/* Main card */}
                <div className={`relative bg-slate-900/40 backdrop-blur-2xl border ${step.borderColor} ${step.hoverBorder} rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-1`}>
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Number badge */}
                    <div className={`flex-shrink-0 relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-all duration-500`}></div>
                      <span className="relative z-10 text-xl sm:text-2xl font-black text-white">{step.num}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Enhanced Why Choose Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 text-center lg:text-left">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                  Why PriceSphere?
                </span>
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { title: "Real-Time Price Updates", desc: "Prices refreshed every minute across all platforms" },
                  { title: "AI-Powered Matching", desc: "Advanced image recognition finds exact products instantly" },
                  { title: "Hands-Free Shopping", desc: "Voice search makes finding deals effortless" },
                  { title: "100% Free Forever", desc: "No hidden fees, no subscriptions, just savings" }
                ].map((item, index) => (
                  <div key={index} className="group flex items-start gap-3 sm:gap-4 p-4 rounded-xl hover:bg-slate-800/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-green-400 transition-colors">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
                  Powered By
                </h3>

                <div className="space-y-4">
                  {[
                    { name: "Amazon", icon: ShoppingBag, color: "orange" },
                    { name: "Flipkart", icon: ShoppingBag, color: "blue" },
                    { name: "Ajio", icon: ShoppingBag, color: "purple" },
                    { name: "Myntra", icon: ShoppingBag, color: "pink" }
                  ].map((platform, index) => {
                    const Icon = platform.icon;
                    return (
                      <div
                        key={index}
                        className={`group relative overflow-hidden flex items-center gap-4 p-4 bg-gradient-to-r ${platform.color === 'orange' ? 'from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:border-orange-500/40' :
                          platform.color === 'blue' ? 'from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40' :
                            platform.color === 'purple' ? 'from-purple-500/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40' :
                              'from-pink-500/10 to-pink-600/10 border border-pink-500/20 hover:border-pink-500/40'
                          } rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-1`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${platform.color === 'orange' ? 'from-orange-500/20 to-orange-600/20' :
                          platform.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                            platform.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                              'from-pink-500/20 to-pink-600/20'
                          } rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-5 h-5 ${platform.color === 'orange' ? 'text-orange-400' :
                            platform.color === 'blue' ? 'text-blue-400' :
                              platform.color === 'purple' ? 'text-purple-400' :
                                'text-pink-400'
                            }`} />
                        </div>

                        <div className="flex-1">
                          <div className={`text-base font-bold ${platform.color === 'orange' ? 'text-orange-400' :
                            platform.color === 'blue' ? 'text-blue-400' :
                              platform.color === 'purple' ? 'text-purple-400' :
                                'text-pink-400'
                            } group-hover:translate-x-1 transition-transform duration-300`}>
                            {platform.name}
                          </div>
                          <div className="text-xs text-slate-500">Live Price Data</div>
                        </div>

                        <Check className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* Enhanced Final CTA */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Ready to Save Big?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              Join thousands of smart shoppers using PriceSphere to find the best deals
            </p>
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-8 sm:px-10 md:px-12 py-5 sm:py-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                Start Comparing Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-slate-800/50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-900/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md"></div>
                <Image
                  src="/assets/logo.png"
                  alt="PriceSphere"
                  width={32}
                  height={32}
                  className="h-8 w-8 sm:h-9 sm:w-9 relative z-10"
                />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                PriceSphere
              </span>
            </div>

            <div className="text-xs sm:text-xs text-slate-500 text-center md:text-left">
              © 2025 PriceSphere. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PriceSpherePage;
