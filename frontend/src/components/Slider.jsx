import React, { useState } from 'react';
import useColorStore from '../store/colorStore.js';
import useSlideStore from '../store/slideStore.js';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdQrCode, MdLogin, MdPersonAdd, MdLogout, MdCreate } from 'react-icons/md';
import DashboardInfoCollapse from './DashboardInfoCollapse.jsx';
import profileimage from '../assets/bg-profile.png';
import { FaCamera, FaChevronDown } from 'react-icons/fa';
import logowhite from '../assets/logo-white.png';
import  useAuthStore  from '../store/authStore.js';
const Slider = () => {
    const { isAuthenticated } = useAuthStore();
    const { isDarkMode } = useColorStore();
    const { isSlideOpen } = useSlideStore();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const linkBaseClasses = "flex items-center transition-colors rounded-xl";
    const expandedClasses = "gap-2 px-2 py-3 text-sm font-medium";
    const collapsedClasses = "p-3 justify-center";
    const activeClasses = isDarkMode
        ? "bg-violet-500/50 text-violet-400"
        : "bg-violet-500/20 text-violet-600";
    const inactiveClasses = isDarkMode
        ? "text-gray-300 hover:bg-violet-500/20 hover:text-violet-400"
        : "text-gray-700 hover:bg-violet-500/20 hover:text-violet-600";
    return (
        <div
            className={`sidebar fixed font-poppins overflow-y-auto z-50 h-[100vh]
    ${isSlideOpen ? 'w-[15rem]' : 'w-0'}       
    ${isSlideOpen ? 'md:w-[15rem]' : 'md:w-[5rem]'} 
    flex flex-col
    ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}
        >
            <div className="flex items-start justify-start w-full p-3">
                <img
                    src={logo}
                    alt="logo"
                    className={`${isSlideOpen ? 'object-contain size-32' : 'object-contain size-20'}`}
                />
            </div>
            <div className="flex flex-col px-3 gap-2 mb-5 w-full">
                <h1 className={`font-bold text-md ${isDarkMode ? 'text-pink-500' : 'text-blue-700'}`}>
                    {isSlideOpen ? 'Dashboard' : 'Dash....'}
                </h1>
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdDashboard size={20} />
                    {isSlideOpen && <span>Dashboard</span>}
                </NavLink>
                <NavLink
                    to="/dashboard/qr-codes"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdQrCode size={20} />
                    {isSlideOpen && <span>Qr Codes</span>}
                </NavLink>
                <NavLink
                    to="/dashboard/create-qr"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                    }
                >
                    <MdCreate size={20} />
                    {isSlideOpen && <span>Create QR</span>}
                </NavLink>
            </div>
            <hr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-[0.3px]`} />
            <div className="flex flex-col px-3 my-5 w-full">
                <h1 className={`font-bold text-md mb-2 ${isDarkMode ? 'text-pink-500' : 'text-blue-700'}`}>
                    {isSlideOpen ? 'Authentication' : 'Auth....'}
                </h1>
                {!isAuthenticated ? (
                    <div className="flex flex-col gap-2">
                        <NavLink
                            to="/sign-up"
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
                    </div>
                ) : (
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses} ${isSlideOpen ? expandedClasses : collapsedClasses}`
                        }
                    >
                        <MdLogout size={20} />
                        {isSlideOpen && <span>Logout</span>}
                    </NavLink>
                )}
            </div>
            <hr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-[0.3px]`} />
            <div className={`${isSlideOpen ? 'flex flex-col items-start justify-start' : 'hidden'} my-5`}>
                <div
                    className={`px-3 mx-auto w-[95%] ${isDarkMode
                        ? 'bg-blue-700 border-2 border-dotted border-white'
                        : 'bg-violet-700 border-2 border-dotted border-black'
                        } py-5 rounded-3xl`}
                >
                    <div className='flex justify-between items-center w-full'>
                        <div
                            className={`relative w-[5rem] h-[5rem] ${isDarkMode ? 'bg-violet-700' : 'bg-blue-700'
                                } rounded-full flex items-center justify-center overflow-hidden`}
                        >
                            <img
                                src={profileimage}
                                alt='avatar'
                                className='w-full h-full object-cover'
                            />
                            <button
                                type='button'
                                className='absolute bottom-0 w-full bg-black/50 flex justify-center py-1'
                            >
                                <FaCamera className='text-white text-sm' />
                            </button>
                        </div>
                        <button
                            type='button'
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            className='transition-transform'
                        >
                            <FaChevronDown
                                className={`text-sm transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''
                                    } ${isDarkMode ? 'text-white' : 'text-black'}`}
                            />
                        </button>
                    </div>

                    <div
                        className={`${isDarkMode ? 'text-white' : 'text-black'} text-sm font-josefinSans grid  grid-cols-1 overflow-hidden transition-all duration-500 ease-in-out ${isDetailsOpen ? 'max-h-40 mt-5' : 'max-h-0'
                            }`}
                    >
                        <p>First Name: Omar</p>
                        <p>Last Name: Qais</p>
                        <p>Username: omarqais122</p>
                        <p>Email: omarqais24@gmail.com</p>
                    </div>
                </div>
            </div>
            {isSlideOpen && (
                <div className="px-3 flex flex-col items-start justify-start my-5 w-full">
                    <DashboardInfoCollapse />
                </div>
            )}
            <hr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} w-full h-[0.3px] ${isSlideOpen ? '' : 'hidden'}`} />
            {isSlideOpen && (
                <div className='px-3 flex flex-col items-start justify-start my-8 w-full'>
                    <div className="flex flex-col items-center justify-center px-3 py-6 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-400 to-indigo-600 text-white text-center">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-indigo-500 -mt-10 shadow-md">
                            <img src={logowhite} alt="logo" className="w-8 h-8" />
                        </div>
                        <h2 className="mt-6 text-lg font-bold">Upgrade to PRO</h2>
                        <p className="mt-2 text-sm opacity-90">
                            to get access to all features! Connect with Venus World!
                        </p>
                    </div>
                </div>
            )}
            <div className="my-auto w-full px-3 pb-2 flex items-end justify-center h-[100%]">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center text-sm`}>
                    v10.81
                </p>
            </div>
        </div>
    );
};
export default Slider;