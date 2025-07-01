"use client";
import LoadingComponent from "../../../../components/loader";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../../../components/sidebar";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import Filter from "./filter";
import { useSelector } from "react-redux";
import { useRef } from "react";
import NotFoundComponent from "../../../../components/prodnotfound";
import ProductCard from "./card";
import { MdOutlineCompare } from "react-icons/md";
import CompareProductsPrompt from "@/components/productscomparison";

type Product = {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string;
  category?: string;
};

const ComparePage: React.FC = () => {
  const [loading, setloading] = useState(false);
  const [mounted, setmounted] = useState(true);
  // Define a proper type for the state
  interface FilterState {
    company: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  }
  
  // Then use it in the useSelector
  const { company, minPrice, maxPrice, sortBy } = useSelector((state: { filters: FilterState }) => state.filters);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState<Product[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setmounted(false)
      setloading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_PYTHON_API}/search`
        , {
          params: {
            key: searchQuery,
          },
        }
      );
      setloading(false)
      console.log(response)
      setFetchedProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch({
  //     type: 'SET_SORT_BY',
  //     payload: e.target.value,
  //   });
  // };

  const filteredProducts = fetchedProducts?.filter(
    (prod) =>
      company.includes(prod.website) &&
      parseFloat(prod.price.replace(/[^\d.-]/g, '')) > minPrice &&
      parseFloat(prod.price.replace(/[^\d.-]/g, '')) < maxPrice
  );

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


  // const [currentPage] = useState(1);
  // const productsPerPage = 9;
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = sortedProducts?.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // const totalPages = Math.ceil(sortedProducts?.length || 0 / productsPerPage);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className=" min-h-screen flex lg:px-6 xl:px-10 sc:px-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white font-poppins">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-4">
        <header className="py-3 lg:py-4 px-3 sm:px-6 md:px-7 lg:px-8 sticky top-0 border-b-[1px] border-gray-600 bg-transparent lg:rounded-r-2xl text-white flex items-center justify-center sm:justify-between  z-10 backdrop-blur">
          <h2 className="text-[20px] hidden sm:flex sm:text-[22px] font-semibold text-orange-500 items-center gap-2">
            <MdOutlineCompare /> <span className="hidden sm:block">Compare</span>
          </h2>
          {showFilters && (
            <div ref={filterRef}>
              <Filter onClose={() => setShowFilters(false)} />
            </div>
          )}
          <div className="relative justify-end md:justify-normal flex items-center gap-5 md:gap-10">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Compare products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-auto md:w-80 px-4 py-1 md:py-2 text-sm text-gray-100 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 rounded-l-full focus:outline-none border border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-[6.5px] md:py-[10.5px] bg-orange-500 text-white rounded-r-full hover:bg-orange-600 transition">
                <FaSearch />
              </button>
            </div>
            <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleFilters}>
              <FaFilter />
              <h2 className="text-white hidden sm:block">Filters</h2>
            </div>
          </div>
        </header>
        <main className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            {!loading && sortedProducts?.length && !mounted ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 sc2:grid-cols-3 gap-10">
                  {sortedProducts.map((product, id) => (
                    <ProductCard key={id} product={product} />
                  ))}
                </div>
              </>
            ) : !loading && !mounted ? (
              <NotFoundComponent />
            ) : loading && !mounted ? (
              <LoadingComponent />
            ) : (
              <CompareProductsPrompt />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComparePage;
