import { FaSpinner } from "react-icons/fa";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-transparent text-blue-100 py-6 lg:p-6">
      <FaSpinner className="text-3xl sm:text-5xl mb-4 text-orange-600 animate-spin" />
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-100">
        Loading Products
      </h2>
      <p className="text-xs sm:text-sm mt-3 text-gray-400 text-center">
        Please wait while we fetch the latest products for you.
      </p>
    </div>
  );
};

export default LoadingComponent;
