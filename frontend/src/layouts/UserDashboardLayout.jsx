import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useColorStore from '../store/colorStore.js';
import Slider from '../components/Slider.jsx';
import useSlideStore from '../store/slideStore.js';
import { MdSettings, MdList, MdDarkMode } from 'react-icons/md';
const UserDashboardLayout = () => {
    const { isDarkMode, toggleDarkMode } = useColorStore();
    const { isSlideOpen, toggleSlide } = useSlideStore();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`user w-screen h-screen ${isDarkMode ? 'bg-gray-900 ' : 'bg-white'}`}>
            <div className='flex flex-row'>
                <Slider />
                <div className={`absolute right-0  ${isSlideOpen ? 'w-[calc(100%-15rem)]' : 'w-[calc(100%-5rem)]'} h-screen ${isDarkMode ? 'bg-dashboard' : 'bg-slate-950'}`}>
                    <div className='z-50 flex flex-col items-center fixed right-0 mr-3 top-[40%]'>
                        <button
                            type='button'
                            onClick={() => setIsOpen(!isOpen)}
                            className='rounded-2xl flex items-center justify-center w-[3rem] h-[3rem] bg-black'
                        >
                            <MdSettings size={20} color='white' className="animate-spin-slow" />
                        </button>
                        <div
                            className={`mt-2 bg-violet-600 p-3 rounded-lg shadow-lg overflow-hidden transition-all duration-300
                            ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul className='flex items-start justify-start gap-2'>
                                <button type='button' onClick={() => { toggleDarkMode(); }}>
                                    <MdDarkMode size={20} color='white' />
                                </button>
                                <button type='button' onClick={() => { toggleSlide(); }}>
                                    <MdList size={20} color='white' />
                                </button>
                            </ul>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default UserDashboardLayout;