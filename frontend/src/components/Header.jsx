import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { MdLogin, MdLogout, MdPersonAdd, MdDashboard } from 'react-icons/md';
import trailer from '../assets/trailer.mp4';
import  useAuthStore  from '../store/authStore.js';
const Header = () => {
    const { isAuthenticated } = useAuthStore();
    return (
        <div className='bg-violet-900/30'>
            <div className='w-full flex items-center justify-between px-5 py-3'>
                <Link to={'/'}>
                    <img src={logo} className='object-contain h-28 p-1' alt="Logo" />
                </Link>
                <div className='flex items-center gap-3 font-josefinSans'>
                    {
                        isAuthenticated ? (
                            <div className='flex gap-3'>
                                <button
                                    type='button'
                                    className='bg-red-400 flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-red-200'>
                                    <MdLogout /> logout
                                </button>
                                <Link to={'/dashboard'}
                                    className='bg-yellow-400 flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-yellow-200'>
                                    <MdDashboard /> Go to dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className='flex gap-3'>
                                <Link
                                    to={'/login'}
                                    className='bg-yellow-300 flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-yellow-200'
                                >
                                    <MdLogin /> login
                                </Link>
                                <Link
                                    to={'/sign-up'}
                                    className='bg-yellow-300 flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-yellow-200'
                                >
                                    <MdPersonAdd /> sign up
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='relative w-full flex flex-col-reverse lg:flex-row justify-center items-center p-5'>
                <div className='relative z-10 lg:left-28 lg:top-20 font-josefinSans bg-black/70 flex flex-col justify-start items-start p-5 rounded-3xl max-w-lg'>
                    <h1 className='text-white font-bold text-2xl'>
                        Welcome to <span className='text-violet-600'>QrPs</span>
                    </h1>
                    <p className='text-white my-3 text-sm'>
                        QR codes are a fast and easy way to share information. They can store links, text, or contact details for instant access. Businesses and individuals use them to connect users with websites or apps quickly. Scanning a QR code with a smartphone instantly retrieves the stored data. This technology simplifies sharing and improves engagement in many fields
                    </p>
                    <Link
                        to={isAuthenticated ? '/dashboard' : '/login'}
                        className='text-white px-4 py-3 bg-violet-700 hover:bg-violet-700/50 rounded-xl mt-2 inline-block'
                    >
                        Create your first <span className='text-green-700'>Qr</span>
                    </Link>
                </div>
                <div className='relative w-full max-w-[35rem] mb-5 lg:mb-0 rounded-3xl overflow-hidden'>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className='w-full h-auto object-cover rounded-3xl'
                    >
                        <source src={trailer} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};
export default Header;