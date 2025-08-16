import React, { useState } from 'react';
import useColorStore from '../../../store/colorStore.js';
import { FaPlus, FaMinus, FaImage } from 'react-icons/fa';
import logos from '../../../data.js';
const Logo = ({ setLogo, logo }) => {
  const { isDarkMode } = useColorStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='px-3 w-full flex flex-col gap-4'>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-sm p-3 ${isDarkMode
          ? 'bg-violet-700 hover:bg-violet-700/40'
          : 'bg-blue-700 hover:bg-blue-700/40'
          } flex items-center justify-between`}
      >
        <div className="flex items-center justify-start gap-3">
          <div
            className={`flex items-center justify-center w-[2rem] h-[2rem] rounded-md ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          >
            <FaImage className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
          </div>
          <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-josefinSans`}>
            Add Logo Image
          </p>
        </div>
        <div>
          {isOpen ? (
            <FaMinus className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
          ) : (
            <FaPlus className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
          )}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in ${isOpen ? 'max-h-[26.3rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col items-start justify-start gap-4 px-2 py-2">
          <div className='flex flex-row items-start gap-3 justify-start'>
            <div className={`w-[9rem] h-[9rem] ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-lg flex items-center justify-center relative`}>
              {!logo && (
                <div className={`flex items-center justify-center text-center w-[8.3rem] h-[8.3rem] p-3 border-2 border-dotted ${isDarkMode ? 'border-black/40' : 'border-white/40'}`}>
                  <p className='text-sm'>No Logo Image</p>
                </div>
              )}
              {logo && (
                <div className='absolute w-[8.3rem] h-[8.3rem] p-3'>
                  <img src={logo} alt="Uploaded Logo" className='w-full h-full object-contain' />
                </div>
              )}
            </div>
            <div className='flex flex-col items-start justify-start gap-3'>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="upload-logo"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setLogo(URL.createObjectURL(file));
                }}
              />
              <label htmlFor="upload-logo" className={`px-4 py-2 rounded-lg font-poppins font-bold text-sm cursor-pointer ${isDarkMode ? 'bg-violet-700 text-white hover:bg-violet-900' : 'bg-blue-700 text-black hover:bg-blue-900'}`}>
                Upload Image
              </label>
              {logo && (
                <button
                  type='button'
                  onClick={() => setLogo(null)}
                  className={`px-4 py-2 rounded-lg font-poppins font-bold text-sm ${isDarkMode ? 'border-[1px] border-violet-700 text-white hover:bg-violet-700' : 'border-[1px] border-blue-700 text-black hover:bg-blue-700'}`}
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
          <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3'>
            {logos.map((logoItem) => (
              <button
                type='button'
                key={logoItem.id}
                className={`${isDarkMode ? 'bg-yellow-700 hover:bg-yellow-900' : 'bg-slate-700 hover:bg-slate-900'} w-[3.3rem] h-[3.3rem] flex items-center justify-center rounded-lg`}
                onClick={() => setLogo(logoItem.src)}
              >
                <img src={logoItem.src} alt={logoItem.alt} className="w-10 h-10 object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Logo;