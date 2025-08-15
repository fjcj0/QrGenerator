import React from 'react'
import useColorStore from '../../../store/colorStore.js';
const CardDashboardOne = ({ icon, value, title, background }) => {
    const { isDarkMode} = useColorStore();
    return (
        <div className={`w-full rounded-md font-poppins p-4 flex flex-row gap-3 justify-start items-start ${background}`}>
            <div className='w-[3rem] h-[3rem] rounded-md flex items-center justify-center bg-white/20 hover:bg-white/10'>
                {icon}
            </div>
            <div className={`flex flex-col mx-2 items-start justify-center ${isDarkMode?' text-black':'text-white'}`}>
                <h1 className='text-xl font-bold'>{value}</h1>
                <p className='text-sm font-bold'>{title}</p>
            </div>
        </div>
    );
}
export default CardDashboardOne;
