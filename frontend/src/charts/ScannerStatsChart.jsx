import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import useQrStore from '../store/qrStore.js'; 
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const ScannerStatsChart = ({ userId }) => {
    const { weeklyStats, getWeeklyStats } = useQrStore();
    useEffect(() => {
        if (userId) getWeeklyStats(userId);
    }, [userId]);
    const stats = weeklyStats
    ? Array.isArray(weeklyStats) 
      ? weeklyStats 
      : [weeklyStats] 
    : [];
  const data = {
      labels: stats.map(stat => {
          const start = new Date(stat.weekStart);
          const end = new Date(stat.weekEnd);
          return `${start.getMonth()+1}/${start.getDate()} - ${end.getMonth()+1}/${end.getDate()}`;
      }),
      datasets: [
          {
              label: 'Total Scanner Times',
              data: stats.map(stat => stat.totalScans),
              backgroundColor: '#EDF2F7',
              stack: 'Stack 0',
          },
          {
              label: 'Total QR',
              data: stats.map(stat => stat.totalQrCreated),
              backgroundColor: '#4299E1',
              stack: 'Stack 0',
          },
          {
              label: 'Lost',
              data: stats.map(stat => stat.totalMoneyLost),
              backgroundColor: '#805AD5',
              stack: 'Stack 0',
          },
      ],
  };  
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                },
            },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true },
        },
    };
    return (
        <div className="w-full h-[500px]">
            <Bar data={data} options={options} />
        </div>
    );
};
export default ScannerStatsChart;