"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import Sidebar from "../../../../components/sidebar";
import axios from "axios";
import Filter from "./filter";
import { useSelector } from "react-redux";
import SearchProductsPrompt from "./searchprod";
import NotFoundComponent from "./prodnotfound";
import LoadingComponent from "@/components/loader";
import ProductCard from "./card";
import HoveredProductCard from "./hovercard";
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

type FavoriteAPIItem = {
  _id: string;
  userId: string;
  product: Product;
};

const FavoritesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { company, minPrice, maxPrice, sortBy } = useSelector(
    (state: { filters: FiltersState }) => state.filters
  );

  type FiltersState = {
    company: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  };
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteAPIItem[] | null>(
    null
  );
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      setLoading(true);
      setMounted(false);
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; // Assuming your API is here
        const response = await axios.get(`${baseURL}/api/favorites`); // Adjust endpoint as needed
        console.log(response);
        if (response.data && response.data.favorites && Array.isArray(response.data.favorites)) {
          setFavoriteProducts(response.data.favorites);
        }
      } catch (err) {
        console.error("Failed fetching favorite products", err);
        setFavoriteProducts([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, []);


// ... other imports

  const handleDeleteFavorite = async (link: string) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.delete(`${baseURL}/api/favorites/${encodeURIComponent(link)}`);
      setFavoriteProducts((prevProducts) =>
        prevProducts ? prevProducts.filter((item) => item.product.link !== link) : []
      );
      toast.success("Product removed from favorites!");
    } catch (error) {
      console.error("Failed to delete favorite product", error);
      toast.error("Failed to remove product from favorites.");
    }
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = favoriteProducts?.filter(
    (favoriteItem) => {
      const companyFilter = company.length === 0 || company.includes(favoriteItem.product.website);
      const price = parseFloat(favoriteItem.product.price.replace(/[^\d.-]/g, ""));
      const minPriceFilter = price >= minPrice;
      const maxPriceFilter = price <= maxPrice;
      const searchFilter = favoriteItem.product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return companyFilter && minPriceFilter && maxPriceFilter && searchFilter;
    }
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    const priceA = parseFloat(a.product.price.replace(/[^\d.-]/g, ""));
    const priceB = parseFloat(b.product.price.replace(/[^\d.-]/g, ""));
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
            <input
              type="text"
              placeholder="Search favorite products..."
              className="w-40 sm:w-64 px-4 py-1.5 md:py-2 pr-10 text-sm text-gray-100 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 rounded-full focus:outline-none border border-orange-500 focus:ring-1 focus:ring-orange-500"
              value={searchQuery}
              onChange={onSearchChange}
            />
            <div className="flex gap-3 md:gap-10">
              <div
                className="relative flex items-center gap-2 cursor-pointer"
                onClick={toggleFilters}
              >
                <FaFilter />
                <h2 className="text-white hidden sm:block">Filters</h2>
              </div>
            </div>
          </div>
        </header>
        <main className="pt-4 sm:pt-7 pb-10 px-2 sm:px-6 relative">
          {!loading && sortedProducts?.length && !mounted ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 sc2:grid-cols-3 gap-2 sm:gap-5">
              {sortedProducts.map((favoriteItem, id) => (
                <div
                  key={id}
                  className="relative"
                  onMouseEnter={() => setHoveredProduct(favoriteItem.product)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <ProductCard product={favoriteItem.product} />
                  {hoveredProduct && hoveredProduct === favoriteItem.product && (
                    <HoveredProductCard product={favoriteItem.product} onDelete={handleDeleteFavorite} />
                  )}
                </div>
              ))}
            </div>
          ) : !loading && !mounted && !favoriteProducts?.length ? (
            <NotFoundComponent />
          ) : loading && !mounted ? (
            <LoadingComponent />
          ) : (
            <SearchProductsPrompt />
          )}
        </main>
      </div>
    </div>
  );
};

export default FavoritesPage;
