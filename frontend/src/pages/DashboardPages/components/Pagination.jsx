import React from "react";
import useColorStore from "../../../store/colorStore.js";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { isDarkMode } = useColorStore();
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 rounded-md font-medium font-josefinSans ${page === currentPage
                            ? `bg-yellow-500/50 ${isDarkMode ? "text-white" : "text-black"}`
                            : `bg-yellow-500 hover:bg-yellow-500/50 ${isDarkMode ? "text-white" : "text-black"}`
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
