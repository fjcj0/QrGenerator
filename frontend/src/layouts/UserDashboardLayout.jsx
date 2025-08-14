import React from 'react';
import { Outlet } from 'react-router-dom';
import useColorStore from '../store/colorStore.js';
import Slider from '../components/Slider.jsx';
const UserDashboardLayout = () => {
    const { isDarkMode } = useColorStore();
    return (
        <div className={`w-screen h-screen bg-black`}>
            <div className='flex flex-row'>
                <Slider />
                <div className={`absolute right-0 w-[calc(100%-18rem)] h-screen ${isDarkMode ? 'bg-dashboard' : 'bg-slate-950'}`}>
                    <Outlet />
                </div>
            </div>
        </div >
    );
}
export default UserDashboardLayout;