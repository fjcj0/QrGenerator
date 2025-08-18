import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaQrcode, FaUsers, FaChartLine } from 'react-icons/fa';
import CardDashboardInfo from './components/CardDashboardInfo';
import CardDashboardOne from './components/CardDashboardOne';
import useColorState from '../../store/colorStore.js';
import ScannerStatsChart from '../../charts/ScannerStatsChart.jsx';
import Scanner from './components/Scanner.jsx';
import ScannerChartCard from '../../charts/ScannerChartData.jsx';
import Loader from '../../tools/Loader.jsx';
import useAuthStore from '../../store/authStore.js';
const DashboardPage = () => {
    const {user} = useAuthStore();
    const [loadingPage, setLoadingPage] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const { isDarkMode } = useColorState();
    const scannerData = [
        { id: 1, name: 'Main Entrance', date: '2025-08-01', totalScanner: 25 },
        { id: 2, name: 'Lobby', date: '2025-08-02', totalScanner: 30 },
        { id: 3, name: 'Parking Lot', date: '2025-08-03', totalScanner: 15 },
        { id: 4, name: 'Reception', date: '2025-08-04', totalScanner: 20 },
        { id: 5, name: 'Office 101', date: '2025-08-05', totalScanner: 10 },
        { id: 6, name: 'Office 102', date: '2025-08-06', totalScanner: 18 },
        { id: 7, name: 'Cafeteria', date: '2025-08-07', totalScanner: 12 },
        { id: 8, name: 'Conference Room', date: '2025-08-08', totalScanner: 22 },
        { id: 9, name: 'Storage', date: '2025-08-09', totalScanner: 8 },
        { id: 10, name: 'Server Room', date: '2025-08-10', totalScanner: 5 },
    ];
    return (
        <div className='p-3'>
            {
                !loadingPage ?
                    <div className='w-full h-[100vh] flex items-center justify-center'>
                        <Loader />
                    </div>
                    :
                    <div>
                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                            <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 xl:col-span-2'>
                                <CardDashboardInfo
                                    icon={<FaDollarSign className={`${isDarkMode ? 'text-black' : 'text-white'} text-2xl`} />}
                                    title='Total Money Lost'
                                    value={`${user ? '$'+user?.totalMoneyLost : '$0'}`}
                                    background='bg-purple-700'
                                />
                                <CardDashboardInfo
                                    icon={<FaQrcode className={`${isDarkMode ? 'text-black' : 'text-white'} text-2xl`} />}
                                    title='Total Free QR'
                                    value={`${user ? user?.totalFreeQr : '0'}`}
                                    background='bg-blue-500'
                                />
                            </div>
                            <div className='grid grid-cols-1 gap-5'>
                                <CardDashboardOne
                                    icon={<FaUsers className={`${isDarkMode ? 'text-black' : 'text-white'} text-2xl`} />}
                                    title='Total Scanners'
                                    value='0 Times'
                                    background='bg-red-500'
                                />
                                <CardDashboardOne
                                    icon={<FaChartLine className={`${isDarkMode ? 'text-black' : 'text-white'} text-2xl`} />}
                                    title='Total QR'
                                    value='0'
                                    background='bg-yellow-500'
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-10'>
                            <div className={`lg:col-span-2 ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-xl`}>
                                <div className='flex flex-col p-5 gap-3 w-full h-full'>
                                    <div className='flex flex-col gap-1'>
                                        <h1 className={`text-md font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Total Growth</h1>
                                        <p className={`text-sm font-poppins  ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>$2,324.00</p>
                                    </div>
                                    <div className='h-full '>
                                        <ScannerStatsChart />
                                    </div>
                                </div>
                            </div>
                            <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} rounded-xl h-[600px] overflow-y-auto`}>
                                <div className='p-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold font-josefinSans`}>Last Ten Scanners</h1>
                                        <FaQrcode className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold font-josefinSans`} />
                                    </div>
                                    <div>
                                        <ScannerChartCard />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {scannerData.map((scanner) => (
                                            <Scanner
                                                key={scanner.id}
                                                name={scanner.name}
                                                date={scanner.date}
                                                totalScanner={scanner.totalScanner}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};
export default DashboardPage;