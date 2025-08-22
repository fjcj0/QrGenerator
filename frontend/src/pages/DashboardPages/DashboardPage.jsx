import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaQrcode, FaUsers, FaChartLine } from 'react-icons/fa';
import CardDashboardInfo from './components/CardDashboardInfo';
import CardDashboardOne from './components/CardDashboardOne';
import useColorState from '../../store/colorStore.js';
import Scanner from './components/Scanner.jsx';
import ScannerChartCard from '../../charts/ScannerChartData.jsx';
import Loader from '../../tools/Loader.jsx';
import useAuthStore from '../../store/authStore.js';
import useQrStore from '../../store/qrStore.js';
import useScannerStore from '../../store/scannerStore.js';
import CustomAreaChart from '../../charts/CustomChart.jsx';
const DashboardPage = () => {
    const { user } = useAuthStore();
    const { getQrsUserScans, userQrsScans, totalScan } = useScannerStore();
    const { totalQr, getQRS,getLastWeekQrStats,lastWeekQrStats } = useQrStore();
    const [loadingPage, setLoadingPage] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    const { isDarkMode } = useColorState();
    useEffect(() => {
        getQRS(user?._id);
    }, [totalQr, user?._id,getQRS]);
    useEffect(() => {
        getQrsUserScans(user?._id);
    }, [totalQr, user?._id,getQrsUserScans]);
    useEffect(()=>{
        getLastWeekQrStats(user?._id);
    },[user?._id,getLastWeekQrStats]);
    console.log(lastWeekQrStats);
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
                                    value={`${user ? '$' + user?.totalMoneyLost : '$0'}`}
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
                                    value={`${totalScan} Times`}
                                    background='bg-red-500'
                                />
                                <CardDashboardOne
                                    icon={<FaChartLine className={`${isDarkMode ? 'text-black' : 'text-white'} text-2xl`} />}
                                    title='Total QR'
                                    value={totalQr}
                                    background='bg-yellow-500'
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-10'>
                            <div className={`lg:col-span-2 ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-xl`}>
                                <div className='flex flex-col p-5 gap-3 w-full h-full'>
                                    <div className='flex flex-col gap-1'>
                                        <h1 className={`text-md font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Total Qr Created Last Week</h1>
                                    </div>
                                    <div className='h-full flex w-full items-center justify-center'>
                                             <CustomAreaChart weekData={lastWeekQrStats}/>
                                    </div>
                                </div>
                            </div>
                            <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} rounded-xl h-[600px] overflow-y-auto p-3`}>
                                <div className='p-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold font-josefinSans`}>Last Ten Scanners</h1>
                                        <FaQrcode className={`${isDarkMode ? 'text-white' : 'text-black'} text-xl font-bold font-josefinSans`} />
                                    </div>
                                    <div>
                                        <ScannerChartCard  userId={user?._id}/>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {userQrsScans && userQrsScans.map((scanner) => (
                                            <Scanner
                                                key={scanner.qrId}
                                                name={scanner.name}
                                                date={scanner.scans && scanner.scans.length > 0
                                                    ? new Date(scanner.scans[0].scannedAt).toLocaleString()
                                                    : "No scans yet"}
                                                totalScanner={scanner.totalScans}
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