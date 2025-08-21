import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
} from 'recharts';
import useQrStore from '../store/qrStore.js';
const ScannerChartCard = ({ userId }) => {
    const [topScanners, setTopScanners] = useState([]);
    const { getTop10UserQrs } = useQrStore();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTop10UserQrs(userId);
                const dataFromStore = useQrStore.getState().top10Scans;
                setTopScanners(dataFromStore);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userId]);
    const threshold = 50; 
    return (
        <div className='bg-[#f2eefe] my-5 p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-2'>
                <div>
                    <h2 className='text-[#6a1b9a] font-bold font-josefinSans text-md'>
                        Top 10 QR Codes
                    </h2>
                    <p className='font-bold text-sm font-josefinSans text-[#555]'>
                        Based on Scan Counts
                    </p>
                </div>
            </div>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={topScanners}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                        <XAxis dataKey="name" tick={{ fill: '#6a1b9a', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#6a1b9a', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #6a1b9a',
                                borderRadius: '8px',
                                color: '#000',
                            }}
                        />
                        <ReferenceLine
                            y={threshold}
                            stroke="#6a1b9a"
                            strokeDasharray="3 3"
                            label={{ position: 'top', value: `Threshold: ${threshold}`, fill: '#6a1b9a' }}
                        />
                        <Bar dataKey="totalScans">
                            {topScanners.map((entry) => (
                                <Cell
                                    key={entry.qrId}
                                    fill={entry.totalScans >= threshold ? '#6a1b9a' : '#dcd3f0'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default ScannerChartCard;