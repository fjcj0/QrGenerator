import React from 'react';
import useColorStore from '../../../store/colorStore.js';
const Scanner = ({name,date,totalScanner}) => {
    const { isDarkMode } = useColorStore();
  return (
      <div className='flex flex-row items-center font-josefinSans justify-between hover:bg-violet-700/40  rounded-md'>
          <div className='flex flex-col gap-2'>
              <h1 className={`text-md ${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</h1>
              <p className='text-md text-green-400'>{date}</p>
          </div>
          <p className={`text-md ${isDarkMode ? 'text-white' : 'text-black'}`}>{totalScanner}</p>
     </div>
  )
}
export default Scanner;