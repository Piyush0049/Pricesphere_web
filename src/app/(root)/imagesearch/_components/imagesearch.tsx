"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../../../components/sidebar";
import { MdImageSearch } from "react-icons/md";
import axios from "axios";
import ProductCard from "./card";
import { FaFilter } from "react-icons/fa";
import Filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import NotFoundComponent from "@/components/prodnotfound";
import ImageUploader from "./upload";
import LoadingComponent from "@/components/loader";
import HoveredProductCard from "./hovercard";

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
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { company, minPrice, maxPrice, sortBy } = useSelector((state: any) => state.filters);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);


  const handleSubmit = async (image: File) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post("http://127.0.0.1:7000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response)
    if (response.data.value) {
      const response2 = await axios.get(`http://127.0.0.1:7000/search`
        , {
          params: {
            key: response.data.value,
          },
        }
      );
      console.log("resp : ",response2)
      setFetchedProducts(response2.data)
    }
    setmounted(true)
    setLoading(false);
  };

  const removeimg = () => {
    setFetchedProducts(null);
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
        <main className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            {!loading && sortedProducts?.length ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 sc2:grid-cols-3 gap-10">
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
            ) : (prediction && mounted && !sortedProducts && (
              <div><NotFoundComponent /></div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageUploadSearch;
