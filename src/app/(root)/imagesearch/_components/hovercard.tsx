import React from "react";
import HoverCard from "@/components/hoverCard";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface hoverProduct {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string;
  category?: string;
  delivery: string[];
  noofrate?: string;
  rating?: string;
}

interface ProductCardProps {
  product: hoverProduct;
}

const HoveredProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product)
  const parseRating = (rating: string | undefined): number => {
    if (!rating) return 0;
    const match = rating.match(/([\d.]+)\s*out/);
    return match ? Math.round(parseFloat(match[1]) * 2) / 2 : 0;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    let truncated = text.slice(0, maxLength);
    if (!truncated.endsWith("...")) {
      truncated += "...";
    }
    return truncated;
  };

  const renderStars = (ratingStr: string | undefined) => {
    const rating = parseRating(ratingStr);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400 text-xs sm:text-base drop-shadow-md"
          />
        );
      } else if (rating > i && rating < i + 1) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-400 text-xs sm:text-base drop-shadow-md"
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-gray-500 text-xs sm:text-base opacity-50"
          />
        );
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <HoverCard>
      <h3 className="text-sm sm:block hidden sm:text-lg font-bold mb-1.5 sm:mb-2 border-b border-gray-600 pb-1">
        {product.name}
      </h3>
      <h3 className="text-[13px] block sm:hidden sm:text-lg font-bold mb-1.5 sm:mb-2 border-b border-gray-600 pb-1">
        {truncateText(product.name, 70)}
      </h3>
      <p className="text-orange-400 text-sm sm:text-base font-semibold mb-1">
        {product.price}
      </p>
      <p className="text-gray-400 text-[11px] sm:text-sm mb-1 sm:mb-2">
        {product.website || "Website Unavailable"}
      </p>
      <div className="flex items-center gap-2">
        {product.rating && renderStars(product.rating)}
        {product.noofrate && (
          <span className="text-gray-200 text-[9px] sm:text-sm font-medium">
            ({product.noofrate?.match(/[\d,]+/)?.[0] || "0"})
          </span>
        )}
      </div>
      {product.delivery && product.delivery.length > 0 && (
        <div className="text-gray-100 font-[520] sm:font-semibold flex flex-col items-start gap-1 text-[10px] sm:text-xs mt-1.5 sm:mt-3 sm:p-2 sm:border sm:border-gray-600 sm:rounded-lg sm:bg-gradient-to-r sm:from-gray-900 sm:to-gray-800">
          <h4 className="text-orange-400 text-sm hidden sm:block font-bold mb-1">
            Delivery Details:
          </h4>
          {product.delivery.map((detail, index) => (
            <p key={index} className="text-gray-300">
              {detail}
            </p>
          ))}
        </div>
      )}
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-[12px] sm:text-base gap-2 mt-1 sm:mt-4 text-orange-500 hover:text-orange-400 font-semibold sm:font-medium sm:border sm:border-orange-500 px-3 py-0.5 sm:px-4 sm:py-2 rounded-md md:rounded-lg transition-all duration-300"
      >
        Buy Now <FaExternalLinkAlt />
      </a>
    </HoverCard>
  );
};

export default HoveredProductCard;
