import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 bg-transparent text-orange-100 py-6 lg:p-6">
            <FaExclamationTriangle className="text-3xl sm:text-5xl mb-4 text-orange-500 animate-bounce" />
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-100">
                No Products Found
            </h2>
            <p className="text-xs sm:text-sm mt-3 text-gray-400 text-center">
                {"We couldn't find any products matching your search criteria. Try adjusting the filters or search terms."}
            </p>
        </div>
    );
};

export default NotFoundComponent;
