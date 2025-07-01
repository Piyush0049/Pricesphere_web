"use client";
import React from "react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:px-6 xl:px-10 sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white font-poppins">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-36">
        <FaExclamationTriangle className="text-orange-500 text-7xl lg:text-8xl mb-4 animate-pulse" />
        <h1 className="text-4xl lg:text-5xl font-bold text-orange-400">404 - Page Not Found</h1>
        <p className="text-gray-300 text-lg mt-3">
          {"Oops! The page you're looking for doesn't exist."}
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-lg transition"
          >
            <FaHome /> Home
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg transition"
          >
            <MdArrowBack /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
