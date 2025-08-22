import React, { useEffect, useState } from 'react';
import useColorStore from '../../store/colorStore.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../tools/Loader.jsx';
import useQrStore, { BASE_URL } from '../../store/qrStore.js';
import useAuthStore from '../../store/authStore.js';
import Pagination from './components/Pagination.jsx';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom';
const QrCodesPage = () => {
    const [loadingIds, setLoadingIds] = useState([]);
    const [bulkLoading, setBulkLoading] = useState(false);
    const { user } = useAuthStore();
    const [loadingPage, setLoadingPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQrs, setSelectedQrs] = useState([]);
    const { qrs, getQRS, totalQr, deleteQRS } = useQrStore();
    useEffect(() => {
        const timer = setTimeout(() => setLoadingPage(true), 1000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (user?._id) getQRS(user._id);
    }, [user?._id, totalQr]);
    const { isDarkMode } = useColorStore();
    const itemsPerPage = 5;
    const filteredQRS = (qrs || []).filter((qr) =>
        qr.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredQRS.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQRS = filteredQRS.slice(startIndex, startIndex + itemsPerPage);
    const handleCheckboxChange = (id) => {
        setSelectedQrs((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = paginatedQRS.map((item) => item._id);
            setSelectedQrs(allIds);
        } else {
            setSelectedQrs([]);
        }
    };
    const isAllSelected = paginatedQRS.length > 0 && selectedQrs.length === paginatedQRS.length;
    const handleDeleteSelected = async () => {
        if (selectedQrs.length === 0) return;
        try {
            setBulkLoading(true);
            await deleteQRS(selectedQrs);
            setSelectedQrs([]);
            if (user?._id) getQRS(user._id);
            toast.success('Qr selected deleted successfully!!');
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setBulkLoading(false);
        }
    };
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
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg h-[100%] font-josefinSans">
                            <table className="min-w-[700px] w-full text-sm text-left table-fixed">
                                <thead className={`text-xs ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3 text-center">Qr</th>
                                        <th className="px-6 py-3 text-center">Date</th>
                                        <th className="px-6 py-3 text-center">Edit</th>
                                        <th className="px-6 py-3 text-center">
                                            <button
                                                type='button'
                                                onClick={handleDeleteSelected}
                                                disabled={bulkLoading || selectedQrs.length === 0}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto 
        ${selectedQrs.length === 0 || bulkLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-800'}`}
                                            >
                                                <FaTrash className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                            </button>
                                        </th>
                                        <th className="px-6 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                className='mx-auto'
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedQRS.length > 0 ? paginatedQRS.map((item) => (
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
                                                <Link to={`/dashboard/edit-qr/${item._id}`} type='button' className='w-8 h-8 rounded-lg bg-yellow-500 hover:bg-yellow-800 flex items-center justify-center mx-auto'>
                                                    <FaEdit className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        try {
                                                            setLoadingIds((prev) => [...prev, item._id]); 
                                                            await deleteQRS([item._id]);
                                                            setSelectedQrs((prev) => prev.filter((id) => id !== item._id));
                                                            if (user?._id) getQRS(user._id);
                                                            toast.success('Qr selected deleted successfully!!');
                                                        } catch (err) {
                                                            console.error("Failed to delete QR:", err);
                                                        } finally {
                                                            setLoadingIds((prev) => prev.filter((id) => id !== item._id)); // clear after done
                                                        }
                                                    }}
                                                    disabled={loadingIds.includes(item._id)}
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto 
        ${loadingIds.includes(item._id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-800'}`}
                                                >
                                                    <FaTrash className={`${isDarkMode ? 'text-black' : 'text-white'}`} />
                                                </button>

                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className='mx-auto'
                                                    checked={selectedQrs.includes(item._id)}
                                                    onChange={() => handleCheckboxChange(item._id)}
                                                />
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className={`text-center py-4 ${isDarkMode ? 'text-white':'text-black'}`}>No QR codes found!!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default QrCodesPage;