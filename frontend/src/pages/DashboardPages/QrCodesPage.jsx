import React from 'react';
import useColorStore from '../../store/colorStore.js';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import image from '../../assets/youtubeqr.svg';
import Pagination from './components/Pagination.jsx';
const QrCodesPage = () => {
    const { isDarkMode } = useColorStore();
    return (
        <div className='p-3 flex items-center justify-center min-h-[100vh]'>
            <div className={`flex flex-col gap-4 overflow-y-auto h-[85vh] ${isDarkMode ? 'bg-black' : ' bg-white'} w-full p-5 rounded-xl`}>
                <h1 className={`text-2xl font-poppins font-bold ${isDarkMode ? 'text-white':'text-black'}`}>Qr Codes</h1>
                <input type='text' placeholder='Enter Qr name to find it...' className='p-3 rounded-md w-[20rem] bg-blue-700 text-white outline-none font-josefinSans placeholder:text-white placeholder:text-sm' />
                <div className={`grid grid-cols-6 gap-5 text-md font-josefinSans font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <div className="flex items-center justify-center h-16">Generated QR</div>
                    <div className="flex items-center justify-center h-16">Name</div>
                    <div className="flex items-center justify-center h-16">Date</div>
                    <div className="flex items-center justify-center h-16">Edit</div>
                    <div className="flex items-center justify-center h-16">
                        <button type='button' className='flex items-center justify-center bg-red-500 p-2 rounded-lg'>
                            <FaTrash className='text-md' />
                        </button>
                    </div>
                    <div className="flex items-center justify-center h-16">
                        <input type="checkbox" />
                    </div>
                </div>
                <hr className={`border-[0.3px] ${isDarkMode ? 'border-white' : 'border-black'}`} />
                <div className={`grid grid-cols-6 gap-5 text-md font-josefinSans font-bold ${isDarkMode ? 'text-white' : ' text-black'}`}>
                    <div className="flex items-center justify-center h-16">
                        <img src={image} alt='logo' className='object-cover h-12' />
                    </div>
                    <div className="flex items-center justify-center h-16">UI YOUTUBE</div>
                    <div className="flex items-center justify-center h-16">2020/12/9</div>
                    <div className="flex items-center justify-center h-16">
                        <button type='button' className='flex items-center justify-center bg-yellow-500 p-2 rounded-lg'>
                            <FaPencilAlt className=' text-md' />
                        </button>
                    </div>
                    <div className="flex items-center justify-center h-16">
                        <button type='button' className='flex items-center justify-center bg-red-500 p-2 rounded-lg'>
                            <FaTrash className=' text-md' />
                        </button>
                    </div>
                    <div className="flex items-center justify-center h-16">
                        <input type="checkbox" />
                    </div>
                </div>
                <div className='h-[100%] flex justify-center items-end'>
                    <Pagination
                        currentPage={3}
                        totalPages={10}
                        onPageChange={(page) => console.log("Go to page:", page)}
                    />
                </div>
            </div>
        </div>
    );
}
export default QrCodesPage;