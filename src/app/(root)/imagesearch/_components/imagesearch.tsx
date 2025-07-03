"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../../../components/sidebar";
import { MdImageSearch } from "react-icons/md";
import axios from "axios";
import ProductCard from "./card";
import { FaFilter, FaSpinner } from "react-icons/fa";
import Filter from "./filter";
import { useSelector } from "react-redux";
import NotFoundComponent from "@/components/prodnotfound";
import ImageUploader from "./upload";
import LoadingComponent from "@/components/loader";
import HoveredProductCard from "./hovercard";
// Or define it inline if not exported from filterSlice
type FiltersState = {
  company: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: string;
};

type Product = {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string;
  category?: string;
  rating?: string;
  delivery: string[];
  noofrate: string
};

const ImageUploadSearch: React.FC = () => {
  const [mounted, setmounted] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState<Product[] | null>(null);
  const [prediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Add loading states for each website
  const [loadingAmazon, setLoadingAmazon] = useState(false);
  const [loadingFlipkart, setLoadingFlipkart] = useState(false);
  const [loadingAjio, setLoadingAjio] = useState(false);
  const [loadingMyntra, setLoadingMyntra] = useState(false);
  
  // Track which websites have been searched
  const [searchedWebsites, setSearchedWebsites] = useState<string[]>([]);
  
  const { company, minPrice, maxPrice, sortBy } = useSelector((state: { filters: FiltersState }) => state.filters);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);


  const handleSubmit = async (image: File) => {
    console.log("Image submitted:", image);
    setLoading(true);
    setFetchedProducts(null); // Clear previous results
    
    // Reset all website loading states
    setLoadingAmazon(true);
    setLoadingFlipkart(true);
    setLoadingAjio(true);
    setLoadingMyntra(true);
    setSearchedWebsites(["amazon", "flipkart", "ajio", "myntra"]);
    
    const formData = new FormData();
    formData.append("image", image);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(response);
      
      if (response.data.value) {
        const searchKey = response.data.value;
        const endpoints = ["amazon", "flipkart", "ajio", "myntra"];
        const baseURL = process.env.NEXT_PUBLIC_PYTHON_API;
        
        endpoints.forEach(async (source) => {
          try {
            const response = await axios.get(`${baseURL}/search/${source}`, {
              params: { key: searchKey },
            });
            
            if (response.data && Array.isArray(response.data)) {
              setFetchedProducts((prev) => (prev ? [...prev, ...response.data] : response.data));
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
      }
      
      setmounted(true);
      // Main loading state will be set to false after all requests are initiated
      // Individual website loaders will show progress
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      setLoadingAmazon(false);
      setLoadingFlipkart(false);
      setLoadingAjio(false);
      setLoadingMyntra(false);
    }
  };

  const removeimg = () => {
    setFetchedProducts(null);
    setLoading(false);
    setLoadingAmazon(false);
    setLoadingFlipkart(false);
    setLoadingAjio(false);
    setLoadingMyntra(false);
    setSearchedWebsites([]);
  }

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredProducts = fetchedProducts?.filter(
    (prod) =>
      company.includes(prod.website) &&
      parseFloat(prod.price.replace(/[^\d.-]/g, '')) > minPrice &&
      parseFloat(prod.price.replace(/[^\d.-]/g, '')) < maxPrice
  );

  // Check if any website is still loading
  const isAnyWebsiteLoading = loadingAmazon || loadingFlipkart || loadingAjio || loadingMyntra;

  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedProducts = filteredProducts?.sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ''));
    const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ''));
    if (sortBy === "low-to-high") {
      return priceA - priceB;
    } else if (sortBy === "high-to-low") {
      return priceB - priceA;
    }
    return 0;
  });


  return (
    <div className="min-h-screen flex font-poppins lg:px-8 xl:px-12 sc:px-28 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="py-3 lg:py-5 px-3 sm:px-6 md:px-7 lg:px-8 sticky top-0  border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-between z-[100] backdrop-blur">
          <div className="text-[20px] sm:text-[22px] flex font-semibold text-orange-500 items-center gap-2">
            <MdImageSearch className="w-6 h-6" />
            <span className="hidden sm:block">Image Search</span>
          </div>
          {showFilters && (
            <div ref={filterRef}>
              <Filter onClose={() => setShowFilters(false)} />
            </div>
          )}
          <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleFilters}>
            <FaFilter />
            <h2 className="text-white hidden sm:block">Filters</h2>
          </div>
        </header>
        <ImageUploader onSearch={handleSubmit} loading={loading} remove={removeimg} />
        {loading && (
          <div className="mt-6 text-orange-500">
            <LoadingComponent />
          </div>)
        }
        <main className="py-8 px-4 md:py-10 md:px-6">
          <div className="max-w-7xl mx-auto">
            {!loading && sortedProducts?.length ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 sc2:grid-cols-3 gap-2 sm:gap-5">
                  {sortedProducts.map((product, id) => (
                    <div
                      key={id}
                      className="relative"
                      onMouseEnter={() => setHoveredProduct(product)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <ProductCard product={product} />
                      {hoveredProduct && hoveredProduct.name === product.name && (
                        <HoveredProductCard product={product} />
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (prediction && mounted && !sortedProducts && !isAnyWebsiteLoading && (
              <div><NotFoundComponent /></div>
            ))}
            
            {/* Website-specific loaders */}
            {mounted && isAnyWebsiteLoading && searchedWebsites.length > 0 && (
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageUploadSearch;
