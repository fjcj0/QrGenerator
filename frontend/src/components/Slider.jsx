import React from 'react';
import useColorStore from '../store/colorStore.js';
import useSlideStore from '../store/slideStore.js';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdQrCode, MdLogin, MdPersonAdd, MdLogout } from 'react-icons/md';
import DashboardInfoCollapse from './DashboardInfoCollapse.jsx';
const Slider = () => {
    const { isDarkMode } = useColorStore();
    const { isSlideOpen } = useSlideStore();
    const linkBaseClasses = "flex items-center transition-colors rounded-xl";
    const expandedClasses = "gap-2 px-2 py-3 text-sm font-medium";
    const collapsedClasses = "p-3 justify-center";
    const activeClasses = isDarkMode ? "bg-violet-500/50 text-violet-400" : "bg-violet-500/20 text-violet-600";
    const inactiveClasses = isDarkMode
        ? "text-gray-300 hover:bg-violet-500/20 hover:text-violet-400"
        : "text-gray-700 hover:bg-violet-500/20 hover:text-violet-600";
    return (
        <div className={`sidebar fixed font-poppins overflow-y-auto h-[100vh] ${isSlideOpen ? 'w-[15rem]' : 'w-[5rem]'} flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <div className={`flex 'items-start justify-start' w-full p-3`}>
                <img src={logo} alt="logo" className={`${isSlideOpen ? 'w-[150px] h-[150px]' : 'w-[4rem] h-[4rem]'}`} />
            </div>
            <div className={`flex flex-col px-3 gap-2 mb-5 w-full`}>
                <h1 className={`font-bold text-md ${isDarkMode ? 'text-pink-500' : 'text-blue-700'}`}>{isSlideOpen ? 'Dashboard' : 'Dash....'}</h1>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdDashboard size={20} />
                    {isSlideOpen && <span>Dashboard</span>}
                </NavLink>
                <NavLink
                    to="/qrcodes"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdQrCode size={20} />
                    {isSlideOpen && <span>Qr Codes</span>}
                </NavLink>
            </div>
            <hr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-[0.3px]`} />
            <div className="flex flex-col px-3 my-5 w-full">
                <h1 className={`font-bold text-md mb-2 ${isDarkMode ? 'text-pink-500' : 'text-blue-700'}`}>{isSlideOpen ? 'Authentication' : 'Auth....'}</h1>
                <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdPersonAdd size={20} />
                    {isSlideOpen && <span>Sign Up</span>}
                </NavLink>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdLogin size={20} />
                    {isSlideOpen && <span>Login</span>}
                </NavLink>
                <NavLink
                    to="/logout"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdLogout size={20} />
                    {isSlideOpen && <span>Logout</span>}
                </NavLink>
            </div>
            <hr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-[0.3px] ${isSlideOpen ? '' : 'hidden'}`} />
            {isSlideOpen && (
                <div className="px-3 flex flex-col items-start justify-start my-5 w-full">
                    <DashboardInfoCollapse />
                </div>
            )}
            <div className="my-auto w-full px-3 pb-3 flex items-end justify-center h-[100%]">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center text-sm`}>v10.81</p>
            </div>
        </div>
    );
};
export default Slider;