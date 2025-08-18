import React, { useEffect, useState } from 'react';
import useColorStore from '../../store/colorStore.js';
import { FaEdit, FaPencilAlt, FaTrash } from 'react-icons/fa';
import image from '../../assets/youtubeqr.svg';
import Pagination from './components/Pagination.jsx';
import Loader from '../../tools/Loader.jsx';
const QrCodesPage = () => {
    const [loadingPage, setLoadingPage] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const { isDarkMode } = useColorStore();
    const qrData = [
        { name: 'Youtube', date: '10-20-2020', img: image },
        { name: 'Google', date: '05-15-2021', img: image },
        { name: 'Facebook', date: '01-10-2022', img: image },
        { name: 'Twitter', date: '03-22-2021', img: image },
        { name: 'Instagram', date: '07-18-2020', img: image },
        { name: 'LinkedIn', date: '02-14-2022', img: image },
        { name: 'Snapchat', date: '11-05-2021', img: image },
        { name: 'Pinterest', date: '08-30-2020', img: image },
        { name: 'Reddit', date: '12-25-2021', img: image },
        { name: 'TikTok', date: '09-12-2021', img: image },
        { name: 'WhatsApp', date: '04-10-2022', img: image },
        { name: 'Telegram', date: '06-15-2021', img: image },
        { name: 'WeChat', date: '01-01-2022', img: image },
        { name: 'Quora', date: '03-05-2021', img: image },
        { name: 'Medium', date: '07-21-2020', img: image },
        { name: 'Vimeo', date: '08-12-2021', img: image },
        { name: 'Spotify', date: '05-08-2022', img: image },
        { name: 'Netflix', date: '10-30-2021', img: image },
        { name: 'Amazon', date: '11-15-2020', img: image },
        { name: 'Ebay', date: '09-25-2021', img: image },
    ];
    return (
        <div className='p-3'>
            {!loadingPage ? <div className='flex items-center justify-center w-full h-[100vh]'>
                <Loader />
            </div> : <div className='flex items-center justify-center min-h-[100vh]'>
                <div className={`flex flex-col gap-4 h-[85vh] ${isDarkMode ? 'bg-black' : 'bg-white'} w-full p-5 rounded-xl`}>
                    <h1 className={`text-2xl font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Qr Codes</h1>
                    <input
                        type='text'
                        placeholder='Enter Qr name to find it...'
                        className='p-3 rounded-md w-[20rem] bg-blue-700 text-white outline-none font-josefinSans placeholder:text-white placeholder:text-sm'
                    />
                    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[100%] font-josefinSans">
                        <table className="min-w-[700px] w-full text-sm text-left table-fixed">
                            <thead className={`text-xs ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3 text-center">Qr</th>
                                    <th className="px-6 py-3 text-center">Date</th>
                                    <th className="px-6 py-3 text-center">Edit</th>
                                    <th className="px-6 py-3 text-center">
                                        <button type='button' className='w-8 h-8 rounded-lg bg-red-500 hover:bg-red-800 flex items-center justify-center mx-auto'>
                                            <FaTrash className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        <input type="checkbox" className='mx-auto' />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {qrData.map((item, index) => (
                                    <tr key={index} className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                        <td className="px-6 py-4 font-medium">{item.name}</td>
                                        <td className="px-6 py-4 text-center">
                                            <img src={item.img} alt="qr" className='inline-block w-16 h-16 object-contain' />
                                        </td>
                                        <td className="px-6 py-4 text-center">{item.date}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button type='button' className='w-8 h-8 rounded-lg bg-yellow-500 hover:bg-yellow-800 flex items-center justify-center mx-auto'>
                                                <FaEdit className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button type='button' className='w-8 h-8 rounded-lg bg-red-500 hover:bg-red-800 flex items-center justify-center mx-auto'>
                                                <FaTrash className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox" className='mx-auto' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='h-[12%] flex justify-center items-end'>
                        <Pagination
                            currentPage={3}
                            totalPages={10}
                            onPageChange={(page) => console.log("Go to page:", page)}
                        />
                    </div>
                </div>
            </div>}
        </div>
    );
}
export default QrCodesPage;