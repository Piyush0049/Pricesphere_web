import React, { useRef, useState, useEffect } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(() => {
    return JSON.parse(localStorage.getItem("cardWidth") || "150");
  });

  useEffect(() => {
    if (!cardRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
        localStorage.setItem("cardWidth", JSON.stringify(newWidth));
      }
    });
    resizeObserver.observe(cardRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 hover:shadow-orange-400/40 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 overflow-hidden rounded-rounded-t-md rounded-sm sm:rounded-xl"
    >
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name || "Product Image"}
          className="h-[160px] sm:h-[280px] w-full object-cover rounded-t-md sm:rounded-t-xl"
        />
      </div>
      <div className="px-2 py-2 sm:p-3.5">
        <h2 className="text-[12px] sm:text-lg font-semibold text-white mb-1 sm:mb-2 truncate hover:text-orange-400 transition-colors">
          {product.name}
        </h2>
        <p className="text-[10.5px] sm:text-xs text-gray-300 mb-1 sm:mb-2 truncate">
          {product.website || "No Website Available"}
        </p>
        <div className="h-[1px] bg-gray-700 my-1.5 sm:my-3"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
          <span className="text-sm sm:text-xl font-bold text-orange-400 drop-shadow-md">
            <sup className="text-[10px] sm:text-sm text-orange-500 font-medium">
              ₹
            </sup>
            {product.price.replace("₹", "")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
