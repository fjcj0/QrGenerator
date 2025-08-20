import React, { useEffect, useState } from 'react';
import useColorStore from '../../store/colorStore.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../tools/Loader.jsx';
import useQrStore, { BASE_URL } from '../../store/qrStore.js';
import useAuthStore from '../../store/authStore.js';
const QrCodesPage = () => {
    const { user } = useAuthStore();
    const [loadingPage, setLoadingPage] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    const { qrs, getQRS,totalQr } = useQrStore();
    useEffect(() => {
        const timer = setTimeout(() => setLoadingPage(true), 1000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (user?._id) getQRS(user._id);
    }, [user?._id,totalQr]);
    const { isDarkMode } = useColorStore();
    const filteredQRS = qrs?.filter(qr =>
        qr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(qrs);
    return (
        <div className='p-3'>
            {!loadingPage ? (
                <div className='flex items-center justify-center w-full h-[100vh]'>
                    <Loader />
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-[100vh]'>
                    <div className={`flex flex-col gap-4 h-[85vh] ${isDarkMode ? 'bg-black' : 'bg-white'} w-full p-5 rounded-xl`}>
                        <h1 className={`text-2xl font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Qr Codes</h1>
                        <input
                            type='text'
                            placeholder='Enter Qr name to find it...'
                            className='p-3 rounded-md w-[20rem] bg-blue-700 text-white outline-none font-josefinSans placeholder:text-white placeholder:text-sm'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[100%] font-josefinSans">
                            <table className="min-w-[700px] w-full text-sm text-left table-fixed">
                                <thead className={`text-xs ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3 text-center">Qr</th>
                                        <th className="px-6 py-3 text-center">Date</th>
                                        <th className="px-6 py-3 text-center">Edit</th>
                                        <th className="px-6 py-3 text-center">Delete</th>
                                        <th className="px-6 py-3 text-center">
                                            <input type="checkbox" className='mx-auto' />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQRS && filteredQRS.length > 0 ? filteredQRS.map((item) => (
                                        <tr key={item._id} className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                            <td className="px-6 py-4 font-medium">{item.name}</td>
                                            <td className="px-6 py-4 text-center">
                                                <img
                                                    src={`${BASE_URL}${item?.imageId?.image}`}
                                                    alt={item.name}
                                                    className="inline-block w-16 h-16 object-contain"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
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
                                    )) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">No QR codes found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default QrCodesPage;