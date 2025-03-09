"use client";
import React from "react";
import Sidebar from "../../../../components/sidebar";
import { FaTags, FaShoppingCart, FaGift, FaPercent, FaUsers, FaStar, FaHeadset } from "react-icons/fa";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen  flex lg:px-6 xl:px-10 font-poppins sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="py-3 sm:py-4 px-5 sm:px-6 sticky top-0 border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-between z-10 backdrop-blur shadow-lg">
          <h2 className="text-[20px] sm:text-[22px] flex font-semibold text-orange-500 items-center gap-2">
            <span className="hidden sm:block">About Us</span>
          </h2>
        </header>
        <div className="flex-1 flex flex-col pb-4">
          <main className="py-10 px-5 sm:px-6">

            <p className="text-gray-300 mb-8">
              Discover top-rated products and the best coupon deals to maximize your savings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {/* Best Products */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaShoppingCart className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Best Products</h3>
                <p className="text-gray-400">Get high-quality products from trusted brands.</p>
              </div>

              {/* Best Coupons */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaGift className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Exclusive Coupons</h3>
                <p className="text-gray-400">Access verified discounts and special deals.</p>
              </div>

              {/* Huge Discounts */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaPercent className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Huge Savings</h3>
                <p className="text-gray-400">Enjoy discounts on a wide range of products.</p>
              </div>

              {/* Trusted by Users */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaUsers className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Trusted by Many</h3>
                <p className="text-gray-400">Join a community of smart shoppers.</p>
              </div>

              {/* Quality Assurance */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <FaStar className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Top Quality</h3>
                <p className="text-gray-400">Only the best deals make it to our platform.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
