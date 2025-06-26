import React from "react";

interface Product {
  image: string;
  name: string;
  website?: string;
  price: string;
  link: string;
}

interface ProductCardProps {
  product: Product;
  key: number
}


const ProductCard: React.FC<ProductCardProps> = ({ product ,key }) => {
  return (
    <div
    key={key}
      className="bg-transparent font-poppins hover:shadow-xl hover:bg-gray-900 hover:-translate-y-2 transform transition-all duration-300 overflow-hidden rounded-lg"
    >
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name || "Product Image"}
          className="h-[200px] sm:h-[280px] w-full object-cover"
        />
      </div>

      <div className="p-4 sm:p-[18px]">
        <h2 className="text-base sm:text-xl font-semibold text-white mb-2 truncate hover:text-orange-400 transition-colors">
          {product.name}
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 mb-3 truncate">
          {product.website || "No Website Available"}
        </p>

        <div className="h-[1px] bg-gray-700 my-2 sm:my-3"></div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-lg sm:text-xl font-bold text-orange-400">
            <sup className="text-xs sm:text-sm text-orange-500 font-medium">₹</sup>
            {product.price.replace("₹", "")}
          </span>
          <button
            type="button"
            onClick={() => {
              window.open(product.link, "_blank", "noopener,noreferrer");
            }}
            className="text-xs sm:text-sm font-medium bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:bg-orange-700 transition-all"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
