"use client";
import LoadingComponent from "../../../../components/loader";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter, FaSpinner } from "react-icons/fa";
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
import toast from "react-hot-toast";

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
  const [mounted, setMounted] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('fetchedProducts');
      return !savedProducts; // If products are saved, it's not 'mounted' in the initial empty state
    }
    return true;
  });
  
  // Add loading states for each website
  const [loadingAmazon, setLoadingAmazon] = useState(false);
  const [loadingFlipkart, setLoadingFlipkart] = useState(false);
  const [loadingAjio, setLoadingAjio] = useState(false);
  const [loadingMyntra, setLoadingMyntra] = useState(false);
  
  // Track which websites have been searched
  const [searchedWebsites, setSearchedWebsites] = useState<string[]>([]);

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
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('searchQuery') || '';
    }
    return '';
  });
  const [fetchedProducts, setFetchedProducts] = useState<Product[] | null>(
    () => {
      if (typeof window !== 'undefined') {
        const savedProducts = localStorage.getItem('fetchedProducts');
        return savedProducts ? JSON.parse(savedProducts) : null;
      }
      return null;
    }
  );
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null); // Add this ref

  const cleanQuery = (query: string): string => {
    return query.trim().replace(/\s+/g, " ");
  };

  const handleTypeSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    const cleanedQuery = cleanQuery(searchQuery);
    if (!cleanedQuery) {
      console.error("No keyword added to search");
      return;
    }

    setFetchedProducts(null); // clear previous results
    localStorage.removeItem('fetchedProducts'); // Clear localStorage for fetched products
    setLoading(true);
    setMounted(false);
    
    // Reset all website loading states
    setLoadingAmazon(true);
    setLoadingFlipkart(true);
    setLoadingAjio(true);
    setLoadingMyntra(true);
    setSearchedWebsites(["amazon", "flipkart", "ajio", "myntra"]);

    const endpoints = ["amazon", "flipkart", "ajio", "myntra"];
    const baseURL = process.env.NEXT_PUBLIC_PYTHON_API;

    endpoints.forEach(async (source) => {
      try {
        const response = await axios.get(`${baseURL}/search/${source}`, {
          params: { key: cleanedQuery },
          signal: newAbortController.signal, // Pass the signal here
        });

        if (response.data && Array.isArray(response.data)) {
          setFetchedProducts((prev) => {
            const newProducts = prev ? [...prev, ...response.data] : response.data;
            localStorage.setItem('fetchedProducts', JSON.stringify(newProducts));
            return newProducts;
          });
        }
        
        // Set loading state for the specific website to false
        switch(source) {
          case "amazon":
            setLoadingAmazon(false);
            break;
          case "flipkart":
            setLoadingFlipkart(false);
            break;
          case "ajio":
            setLoadingAjio(false);
            break;
          case "myntra":
            setLoadingMyntra(false);
            break;
        }
      } catch (err) {
        console.error(`Failed fetching ${source}`, err);
        switch(source) {
          case "amazon":
            setLoadingAmazon(false);
            break;
          case "flipkart":
            setLoadingFlipkart(false);
            break;
          case "ajio":
            setLoadingAjio(false);
            break;
          case "myntra":
            setLoadingMyntra(false);
            break;
        }
      }
    });
    setLoading(false);
  };


  const handleVoiceSearch = async (e: React.FormEvent, voiceQuery: string) => {
    e.preventDefault();

    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    const cleanedQuery = cleanQuery(voiceQuery);
    if (!cleanedQuery) {
      console.error("No keyword added to search");
      return;
    }
    
    setFetchedProducts(null); // clear previous results
    localStorage.removeItem('fetchedProducts'); // Clear localStorage for fetched products
    setLoading(true);
    setMounted(false);
    
    // Reset all website loading states
    setLoadingAmazon(true);
    setLoadingFlipkart(true);
    setLoadingAjio(true);
    setLoadingMyntra(true);
    setSearchedWebsites(["amazon", "flipkart", "ajio", "myntra"]);

    const endpoints = ["amazon", "flipkart", "ajio", "myntra"];
    const baseURL = process.env.NEXT_PUBLIC_PYTHON_API;

    endpoints.forEach(async (source) => {
      try {
        const response = await axios.get(`${baseURL}/search/${source}`, {
          params: { key: cleanedQuery },
          signal: newAbortController.signal, // Pass the signal here
        });

        if (response.data && Array.isArray(response.data)) {
          setFetchedProducts((prev) => {
            const newProducts = prev ? [...prev, ...response.data] : response.data;
            localStorage.setItem('fetchedProducts', JSON.stringify(newProducts));
            return newProducts;
          });
        }
        
        // Set loading state for the specific website to false
        switch(source) {
          case "amazon":
            setLoadingAmazon(false);
            break;
          case "flipkart":
            setLoadingFlipkart(false);
            break;
          case "ajio":
            setLoadingAjio(false);
            break;
          case "myntra":
            setLoadingMyntra(false);
            break;
        }
      } catch (err) {
        console.error(`Failed fetching ${source}`, err);
        // Set loading state for the specific website to false even on error
        switch(source) {
          case "amazon":
            setLoadingAmazon(false);
            break;
          case "flipkart":
            setLoadingFlipkart(false);
            break;
          case "ajio":
            setLoadingAjio(false);
            break;
          case "myntra":
            setLoadingMyntra(false);
            break;
        }
      }
    });
    
    // Main loading state will be set to false after all requests are initiated
    // Individual website loaders will show progress
    setLoading(false);
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

  const isAnyWebsiteLoading = loadingAmazon || loadingFlipkart || loadingAjio || loadingMyntra;

  const handleFavoriteToggle = async (product: Product) => {

    try {
      const response = await axios.post("/api/favorites", {
        product: {
          name: product.name,
          price: product.price,
          image: product.image,
          website: product.website,
          link: product.link,
        },
      });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to toggle favorite.");
    }
  };

  return (
    <div className="min-h-screen flex lg:px-6 xl:px-10 sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white font-poppins relative">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="py-1 sm:py-3 px-3 sm:px-6 md:px-7 lg:px-8 sticky bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 top-0 border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-between sm:justify-end  z-[100]">
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    localStorage.setItem('searchQuery', e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTypeSearch(e);
                    }
                  }}
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
                    <HoveredProductCard product={product} onFavoriteToggle={() => handleFavoriteToggle(product)} />
                  )}
                </div>
              ))}
            </div>
          ) : !loading && !mounted && !isAnyWebsiteLoading ? (
            <NotFoundComponent />
          ) : loading && !mounted ? (
            <LoadingComponent />
          ) : (
            <NoProductsFound />
          )}
          
          {/* Website-specific loaders */}
          {!mounted && isAnyWebsiteLoading && searchedWebsites.length > 0 && (
            <div className="mt-8 border-t border-gray-700 pt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-200">
                Fetching products from multiple websites
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {loadingAmazon && searchedWebsites.includes("amazon") && (
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center">
                    <FaSpinner className="text-xl sm:text-2xl mb-2 text-orange-500 animate-spin" />
                    <p className="text-xs sm:text-sm font-medium text-gray-300">Amazon</p>
                  </div>
                )}
                {loadingFlipkart && searchedWebsites.includes("flipkart") && (
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center">
                    <FaSpinner className="text-xl sm:text-2xl mb-2 text-orange-500 animate-spin" />
                    <p className="text-xs sm:text-sm font-medium text-gray-300">Flipkart</p>
                  </div>
                )}
                {loadingAjio && searchedWebsites.includes("ajio") && (
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center">
                    <FaSpinner className="text-xl sm:text-2xl mb-2 text-orange-500 animate-spin" />
                    <p className="text-xs sm:text-sm font-medium text-gray-300">Ajio</p>
                  </div>
                )}
                {loadingMyntra && searchedWebsites.includes("myntra") && (
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center">
                    <FaSpinner className="text-xl sm:text-2xl mb-2 text-orange-500 animate-spin" />
                    <p className="text-xs sm:text-sm font-medium text-gray-300">Myntra</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-3 text-gray-400">
                Some results may already be displayed while others are still loading
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
