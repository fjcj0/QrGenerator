import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScannerStatsChart = () => {
    const data = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Total Scanner Times',
                data: [40, 120, 35, 38, 38, 78, 35, 20, 30, 45, 15, 75],
                backgroundColor: '#EDF2F7',
                stack: 'Stack 0',
            },
            {
                label: 'Total QR',
                data: [30, 15, 10, 35, 50, 45, 80, 25, 20, 85, 25, 70],
                backgroundColor: '#4299E1',
                stack: 'Stack 0',
            },
            {
                label: 'Lost',
                data: [35, 150, 40, 30, 30, 100, 100, 10, 60, 45, 30, 15],
                backgroundColor: '#805AD5',
                stack: 'Stack 0',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // ⬅️ allows the parent container to control height
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
