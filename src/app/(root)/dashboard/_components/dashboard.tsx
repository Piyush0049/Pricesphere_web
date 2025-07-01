"use client";
import LoadingComponent from "../../../../components/loader";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Sidebar from "../../../../components/sidebar";
import axios from "axios";
import Filter from "./filter";
import { useSelector } from "react-redux";
import NoProductsFound from "../../../../components/searchprod";
import NotFoundComponent from "../../../../components/prodnotfound";
import ProductCard from "./card";
import HoveredProductCard from "./hovercard";
import RecordingComponent from "./recordingComponent";
import Image from "next/image";

type Product = {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string;
  category?: string;
  rating?: string;
  delivery: string[];
  noofrate: string;
};

const ProductsPage: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  
  // With:
  const { company, minPrice, maxPrice, sortBy } = useSelector(
    (state: { filters: FiltersState }) => state.filters
  );
  
  // Where FiltersState is imported from your filterSlice or defined as:
  type FiltersState = {
    company: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState<Product[] | null>(
    null
  );
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const cleanQuery = (query: string): string => {
    return query.trim().replace(/\s+/g, " ");
  };

  const handleTypeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedQuery = cleanQuery(searchQuery);
    if (!cleanedQuery) {
      console.error("No keyword added to search");
      return;
    }
    try {
      setMounted(false);
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_PYTHON_API}/search`, {
        params: { key: cleanedQuery },
      });
      setLoading(false);
      console.log(response);
      setFetchedProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoiceSearch = async (e: React.FormEvent, voiceQuery: string) => {
    e.preventDefault();
    const cleanedQuery = cleanQuery(voiceQuery);
    if (!cleanedQuery) {
      console.error("No keyword added to search");
      return;
    }
    try {
      setMounted(false);
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_PYTHON_API}/search`, {
        params: { key: cleanedQuery },
      });
      setLoading(false);
      console.log(response);
      setFetchedProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredProducts = fetchedProducts?.filter(
    (prod) =>
      company.includes(prod.website) &&
      parseFloat(prod.price.replace(/[^\d.-]/g, "")) > minPrice &&
      parseFloat(prod.price.replace(/[^\d.-]/g, "")) < maxPrice
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
    const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
    return sortBy === "low-to-high" ? priceA - priceB : priceB - priceA;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 9;
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  return (
    <div className="min-h-screen flex lg:px-6 xl:px-10 sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white font-poppins relative">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="sm:py-3 px-3 sm:px-6 md:px-7 lg:px-8 sticky bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 top-0 border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-between sm:justify-end  z-[100]">
          <Image
            src="/assets/logo.png"
            alt="PriceSphere Logo"
            width={56}
            height={56}
            className="object-contain"
            sizes="59px"
            priority={true}
          />
          {showFilters && (
            <div ref={filterRef}>
              <Filter onClose={() => setShowFilters(false)} />
            </div>
          )}
          <div className="relative justify-end md:justify-normal flex items-center gap-5 md:gap-10">
            <div className="flex gap-3 md:gap-10">
              <div
                className="relative flex items-center gap-2 cursor-pointer"
                onClick={toggleFilters}
              >
                <FaFilter />
                <h2 className="text-white hidden sm:block">Filters</h2>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 sm:w-64 px-4 py-1.5 md:py-2 pr-10 text-sm text-gray-100 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 rounded-l-full focus:outline-none border border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <RecordingComponent
                  recording={recording}
                  setRecording={setRecording}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleVoiceSearch}
                />
                <button
                  onClick={handleTypeSearch}
                  className="px-4 py-[8.5px] md:py-[10.5px] bg-orange-500 text-white rounded-r-full hover:bg-orange-600 transition"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="pt-4 sm:pt-7 pb-10 px-2 sm:px-6 relative">
          {!loading && sortedProducts?.length && !mounted ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 sc2:grid-cols-3 gap-2 sm:gap-5">
              {sortedProducts.map((product, id) => (
                <div
                  key={id}
                  className="relative"
                  onMouseEnter={() => setHoveredProduct(product)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <ProductCard product={product} />
                  {hoveredProduct && hoveredProduct === product && (
                    <HoveredProductCard product={product} />
                  )}
                </div>
              ))}
            </div>
          ) : !loading && !mounted ? (
            <NotFoundComponent />
          ) : loading && !mounted ? (
            <LoadingComponent />
          ) : (
            <NoProductsFound />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
