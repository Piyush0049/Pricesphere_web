import React from "react";
import HoverCard from "@/components/mycomp";
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
  rating?: string; // "4.0 out of 5 stars"
}

interface ProductCardProps {
  product: hoverProduct;
}

const HoveredProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const parseRating = (rating: string | undefined): number => {
    if (!rating) return 0;
    const match = rating.match(/([\d.]+)\s*out/);
    return match ? Math.round(parseFloat(match[1]) * 2) / 2 : 0;
  };

  const renderStars = (ratingStr: string | undefined) => {
    const rating = parseRating(ratingStr);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<FaStar key={i} className="text-yellow-400 drop-shadow-md" />);
      } else if (rating > i && rating < i + 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 drop-shadow-md" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-500 opacity-50" />);
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <HoverCard className="relative bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-xl p-6 text-white z-20 
      transition-all duration-300 ease-in-out animate-popIn hover:shadow-orange-400/30">
      <h3 className="text-lg sm:text-lg font-bold mb-2 border-b border-gray-600 pb-1">
        {product.name}
      </h3>
      <p className="text-orange-400 text-sm sm:text-base font-semibold mb-1">
        {product.price}
      </p>
      <p className="text-gray-400 text-xs sm:text-sm mb-2">
        {product.website || "Website Unavailable"}
      </p>
      <div className="flex items-center gap-2">
        {renderStars(product.rating)}
        <span className="text-gray-300 text-xs sm:text-sm font-medium">
          ({product.noofrate?.match(/[\d,]+/)?.[0] || "0"} ratings)
        </span>
      </div>
      {product.delivery && product.delivery.length > 0 && (
        <div className="text-gray-300 font-semibold flex flex-col items-start gap-1 text-xs sm:text-xs mt-3 p-2 border border-gray-600 rounded-lg  bg-gradient-to-r from-gray-900 to-gray-800">
          <h4 className="text-orange-400 text-sm font-bold mb-1">Delivery Details:</h4>
          {product.delivery.map((detail, index) => (
            <p key={index} className="text-gray-400">{detail}</p>
          ))}
        </div>
      )}
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 text-orange-500 hover:text-orange-400 font-medium border border-orange-500 px-4 py-2 rounded-lg transition-all duration-300"
      >
        Buy Now <FaExternalLinkAlt />
      </a>
    </HoverCard>

  );
};

export default HoveredProductCard;
