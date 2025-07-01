"use client";
import React from "react";
import { motion } from "framer-motion";
import ReactSlider from "react-slider";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setPriceRange, setSortBy } from "@/redux/slices/filterSlice";
import { RootState } from "@/redux/store";

type Props = {
    onClose: () => void;
};
const Filter: React.FC<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    const companies = [
        "Amazon",
        "Ajio",
        "Flipkart",
        "Myntra"
    ];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const updatedCompanies = checked
            ? [...filters.company, value]
            :
            filters.company.filter((item: string) => item !== value);
        dispatch(setCompany(updatedCompanies));
    };

    const handleSliderChange = ([min, max]: [number, number]) => {
        dispatch(setPriceRange({ minPrice: min, maxPrice: max }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-50 absolute top-full left-0 w-full bg-gray-800/100 text-white shadow-2xl p-5 md:p-8 mt-4 rounded-xl"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-orange-300 tracking-wide">
                    Filter Options
                </h3>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="text-gray-400 hover:text-white transition"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
                {/* Price Range Filter */}
                <div>
                    <h4 className="text-sm lg:text-base font-semibold text-gray-100 mb-4 tracking-wide">
                        Price Range
                    </h4>
                    <div className="pt-1 pb-4 lg:py-4">
                        <ReactSlider
                            className="relative w-full h-2 lg:h-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-full"
                            thumbClassName="w-4 lg:w-6 h-4 lg:h-6 bg-gradient-to-r from-orange-500 to-orange-400 border-2 border-white rounded-full shadow-md cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-300"
                            trackClassName="bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
                            min={0}
                            max={200000}
                            value={[filters.minPrice, filters.maxPrice]}
                            onChange={handleSliderChange}
                            pearling
                            minDistance={1000}
                        />

                        <div className="flex justify-between mt-4">
                            <div className="flex items-center gap-1 text-xs lg:text-sm text-gray-300">
                                <span className="font-medium text-orange-400">Min:</span>
                                <span>₹{filters.minPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs lg:text-sm text-gray-300">
                                <span className="font-medium text-orange-400">Max:</span>
                                <span>₹{filters.maxPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm lg:text-base font-semibold text-gray-100 mt-4 lg:mt-0 mb-4 tracking-wide">
                        Company
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {companies.map((company) => (
                            <label
                                key={company}
                                className="flex items-center gap-3 hover:text-orange-400 transition"
                            >
                                <input
                                    type="checkbox"
                                    value={company}
                                    checked={filters.company.includes(company)}
                                    onChange={handleFilterChange}
                                    className="w-5 h-5 accent-orange-500 rounded focus:ring-0 border-gray-400"
                                />
                                <span className="text-xs lg:text-sm text-gray-300">{company}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h4 className="text-sm lg:text-base font-semibold text-gray-100 mb-4 tracking-wide">
                    Sort by Price
                </h4>
                <select
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="w-full text-xs lg:text-sm bg-gray-700 text-gray-300 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                >
                    <option value="" disabled>
                        Select Sorting
                    </option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                    <option value="none">None</option>
                </select>
            </div>
        </motion.div>
    );
};

export default Filter;
