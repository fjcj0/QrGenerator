import React from 'react';
import useColorStore from '../store/colorStore.js';
const Slider = () => {
    const { isDarkMode } = useColorStore();
    return (
        <div className={`fixed h-[100vh] w-[18rem] ${isDarkMode ? ' bg-slider' : 'bg-slate-400'}`} >


        </div >
    );
}
export default Slider;
