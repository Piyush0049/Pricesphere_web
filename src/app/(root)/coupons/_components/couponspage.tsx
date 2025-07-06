"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../../../../components/sidebar";
import { FaStore, FaTag, FaClipboard, FaChevronDown, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { FaSadTear } from "react-icons/fa";


interface ICoupon {
  name: string;
  highlight: string;
  details: string;
  code: string;
  expired: 'expired'
  website: string;
}

const CouponsPage: React.FC = () => {
  const [selectedWebsite, setSelectedWebsite] = useState("All");
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  const websites = ["All", "Ajio", "Amazon", "Flipkart", "Myntra"];

  useEffect(() => {
    console.log(loading, error);
  }, [loading, error]);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coupons/get`);
        console.log(response);
  
        // Correctly access the array of coupons
        const receivedCoupons = response.data?.data ?? [];
  
        setCoupons(receivedCoupons);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCoupons();
  }, [selectedWebsite]);
  
  const filteredCoupons = selectedWebsite === "All"
    ? coupons
    : coupons.filter((coupon) => coupon.website === selectedWebsite);

  const openModal = (coupon: ICoupon) => {
    setSelectedCoupon(coupon)
    setIsModalOpen(true);
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDetails = (details: string) => {
    return details
      .split("\n") // Split by new lines
      .map((line) => line.trim()) // Trim spaces
      .filter((line) => line !== ""); // Remove empty lines
  };


  return (
    <div className=" min-h-screen flex lg:px-6 xl:px-10 font-poppins sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="py-3 sm:py-4 px-5 sm:px-6 sticky top-0 border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-between z-10 backdrop-blur shadow-lg">
          <h2 className="text-[20px] sm:text-[22px] flex font-semibold text-orange-500 items-center gap-2">
            <FaTag /> <span className="hidden sm:block">Coupons</span>
          </h2>
          <div className="relative">
            <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedWebsite}
              onChange={(e) => setSelectedWebsite(e.target.value)}
              className="bg-gray-700 text-sm sm:text-base text-white px-10 py-1 sm:py-2 rounded-lg outline-none cursor-pointer appearance-none pr-8 shadow-md hover:bg-gray-600 transition"
            >
              {websites.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </header>

        <main className="py-10 px-5 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`${filteredCoupons.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "flex justify-center"}`}>
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="relative bg-transparent hover:bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {/* Website Tag */}
                    <span className="absolute -top-3 bg-gray-900 -right-4 border-[2px] border-orange-900 font-semibold text-gray-400 text-xs px-3 py-1 rounded-xl">
                      {coupon.website}
                    </span>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-orange-300 flex items-center gap-2">
                        {coupon.name}
                      </h3>
                      <button
                        onClick={() => openModal(coupon)}
                        className="text-xs sm:text-base hover:text-orange-300"
                      >
                        <FaEye />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">{coupon.highlight}</p>
                    <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-3">
                      <span className="text-xs sm:text-sm bg-orange-500 text-gray-800 px-3 py-1 rounded-lg flex items-center gap-2 font-semibold">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className={`text-xs sm:text-sm px-3 py-1 rounded-lg text-white flex items-center gap-2 transition-all duration-200 ${copiedCode === coupon.code ? "bg-orange-600" : "bg-gray-950 hover:bg-gray-800"
                          }`}>
                        {copiedCode === coupon.code ? <FaCheck /> : <FaClipboard />}{" "}
                        {copiedCode === coupon.code ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300 py-10">
                  <FaSadTear className="text-6xl text-orange-500 mb-4" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">Sorry, no coupons available</h3>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg mt-2">Check back later for more offers!</p>
                </div>
              )}

            </div>
          </div>
        </main>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4"
            onClick={() => { setIsModalOpen(false); setSelectedCoupon(null); }} // Close on outside click
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              className="bg-gray-900 p-6 rounded-2xl w-auto max-w-full shadow-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-orange-400 text-center">{selectedCoupon?.name}</h3>
              <p className="text-gray-300 mt-2 text-center">{selectedCoupon?.highlight}</p>

              {/* Coupon Code Section */}
              <div className="mt-5 text-center">
                <div className="mt-2 bg-gray-800 px-4 py-2 rounded-lg inline-block text-orange-400 font-bold text-lg">
                  {selectedCoupon?.code}
                </div>
              </div>

              {/* Coupon Details */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-200">Details</h4>
                <ul className="text-gray-300 text-sm list-none pl-0 mt-3 space-y-2">
                  {formatDetails(selectedCoupon?.details || "").map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400">✔</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-orange-600 text-black rounded-lg hover:bg-orange-500 transition-all shadow-md font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;