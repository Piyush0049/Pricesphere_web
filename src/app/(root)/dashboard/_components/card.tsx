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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md border border-gray-700 hover:shadow-orange-400/40 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden rounded-xl">
      {/* Product Image */}
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name || "Product Image"}
          className="h-[180px] sm:h-[290px] w-full object-cover rounded-t-xl"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate hover:text-orange-400 transition-colors">
          {product.name}
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 mb-3 truncate">
          {product.website || "No Website Available"}
        </p>

        {/* Divider Line */}
        <div className="h-[1px] bg-gray-700 my-3"></div>

        {/* Price & Buy Now Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Price Tag */}
          <span className="text-xl sm:text-2xl font-bold text-orange-400 drop-shadow-md">
            <sup className="text-xs sm:text-sm text-orange-500 font-medium">₹</sup>
            {product.price.replace("₹", "")}
          </span>

          {/* Buy Now Button */}
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 sm:hidden hover:bg-orange-600 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
