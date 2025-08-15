import React from 'react';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
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
const top5Scanners = [...scannerData]
    .sort((a, b) => b.totalScanner - a.totalScanner)
    .slice(0, 5);

const totalScans = top5Scanners.reduce((acc, curr) => acc + curr.totalScanner, 0);
const ScannerChartCard = () => {
    return (
        <div className='bg-[#f2eefe] my-5 p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-2'>
                <div>
                    <h2 className='text-[#6a1b9a] font-bold font-josefinSans text-md'>Top 5 Scanner Zones</h2>
                    <p className='font-bold text-sm font-josefinSans text-[#555]'>Based on Scan Counts</p>
                </div>
                <h2 className='font-josefinSans text-[#000] font-bold'>{totalScans} Scans</h2>
            </div>
            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                    <AreaChart data={top5Scanners}>
                        <defs>
                            <linearGradient id="colorScan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6a1b9a" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6a1b9a" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="totalScanner"
                            stroke="#6a1b9a"
                            fillOpacity={1}
                            fill="url(#colorScan)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default ScannerChartCard;