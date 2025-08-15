import React from 'react';
import { MdQrCode, MdEdit, MdBarChart, MdFolder, MdPalette } from 'react-icons/md';
import AboutCard from '../../components/AboutCard';
import { Link } from 'react-router-dom';
import AdvantagesQr from '../../components/AdvantagesQr';
import ExamplesQr from '../../components/ExamplesQr';
import AskedQuestions from '../../components/AskedQuestions';
const HomePage = () => {
    const features = [
        {
            title: "Dynamic QR Codes",
            icon: <MdQrCode className="text-white text-5xl" />,
            paragraph: "Edit and change your QR codes anytime."
        },
        {
            title: "Scan Statistics",
            icon: <MdBarChart className="text-white text-5xl" />,
            paragraph: "Track your QR codes and get insights about scans."
        },
        {
            title: "Bulk Creation and Editing",
            icon: <MdEdit className="text-white text-5xl" />,
            paragraph: "Create and edit many QR codes in no time."
        },
        {
            title: "Campaign Folders",
            icon: <MdFolder className="text-white text-5xl" />,
            paragraph: "Structure and organize your QR codes in campaign folders."
        },
        {
            title: "More Design Options",
            icon: <MdPalette className="text-white text-5xl" />,
            paragraph: "Create transparent QR codes and reusable design templates."
        }
    ];
    return (
        <div className='my-20'>
            <div className=' bg-black/80'>
                <div className='flex flex-col items-center justify-center gap-5 py-3'>
                    <h1 className='text-white text-2xl font-bold font-poppins'>GET MORE</h1>
                    <p className='font-josefinSans text-white max-w-[90%] lg:max-w-[30%] text-center'>
                        The professional <span className='font-bold text-violet-700'>QR Code Management</span> platform to create, track and edit all your QR codes in one place
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-[90%]'>
                        {features.map((item, index) => (
                            <AboutCard
                                key={index}
                                title={item.title}
                                icon={item.icon}
                                paragraph={item.paragraph}
                            />
                        ))}
                    </div>
                    <Link to={'/dashboard/create-qr'} className='border-[0.3px] border-white text-white px-4 py-3 rounded-xl font-josefinSans font-bold hover:bg-white/80 hover:text-black'>Get Started Now</Link>
                </div>
            </div>
            <AdvantagesQr />
            <ExamplesQr />
            <AskedQuestions/>
        </div>
    );
}
export default HomePage;