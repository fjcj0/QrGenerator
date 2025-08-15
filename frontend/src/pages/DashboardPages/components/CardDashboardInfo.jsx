import React from 'react';
import useColorStore from '../../../store/colorStore.js';
const CardDashboardInfo = ({ icon, value, title, background }) => {
  const { isDarkMode } = useColorStore();
  return (
    <div className={`w-full rounded-md font-poppins  p-4 flex flex-col gap-3 justify-start items-start ${background}`}>
      <div className='w-[4rem] h-[4rem] rounded-md flex items-center justify-center bg-white/20 hover:bg-white/10'>
        {icon}
      </div>
      <div className={`flex flex-col my-5 items-start justify-start ${isDarkMode?'text-black':'text-white'}`}>
        <h1 className='text-xl font-bold'>{value}</h1>
        <p className='text-sm font-bold'>{title}</p>
      </div>
    </div>
  );
};
export default CardDashboardInfo;