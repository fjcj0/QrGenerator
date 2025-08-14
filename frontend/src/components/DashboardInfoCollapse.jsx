import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import useColorStore from '../store/colorStore.js';
const DashboardInfoCollapse = () => {
    const { isDarkMode } = useColorStore();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 ${isDarkMode ? 'bg-violet-600 hover:bg-violet-600/50' : 'bg-blue-600 hover:bg-blue-600/50'} ${isDarkMode ? 'text-white' : 'text-black'} font-medium rounded-lg`}
            >
                <span>About Dashboard</span>
                {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
            </button>
            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'} px-3 py-2 rounded-lg text-start`}>
                    This dashboard gives you access to QR code tools, user authentication,
                    and quick navigation between key features.
                </p>
            </div>
        </div>
    );
};
export default DashboardInfoCollapse;