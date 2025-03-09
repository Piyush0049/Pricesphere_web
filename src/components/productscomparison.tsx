import { MdCompare } from "react-icons/md";

const CompareProductsPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-transparent text-orange-100 py-6 lg:p-6">
      <MdCompare className="text-3xl sm:text-5xl mb-4 text-orange-500 animate-bounce" />
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-100">
        Compare the Products
      </h2>
      <p className="text-xs sm:text-sm mt-3 text-gray-400 text-center">
        Please enter the product you want to compare. Use the search bar above to get started!
      </p>
    </div>
  );
};

export default CompareProductsPrompt;