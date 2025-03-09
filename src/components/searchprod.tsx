import { FaSearch } from "react-icons/fa";

const SearchProductsPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-transparent text-orange-100 py-6 lg:p-6">
      {/* The logo with a slow bounce animation */}
      <img
        src="/assets/logo.png"
        alt="logo"
        className="w-24 h-auto animate-slow-bounce"
      />
      <style jsx>{`
            @keyframes slow-bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-25px);
              }
            }
            .animate-slow-bounce {
              animation: slow-bounce 2s infinite;
            }
          `}</style>
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-100">
        Search for Products
      </h2>
      <p className="text-xs sm:text-base mt-3 text-gray-400 text-center">
        Enter a product to explore using the search bar!
      </p>
    </div>
  );
};

export default SearchProductsPrompt;