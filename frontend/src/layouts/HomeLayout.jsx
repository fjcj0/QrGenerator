import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bgImage from '../assets/background-dahsbaord.jpg';
const HomeLayout = () => {
    return (
        <div
            className='w-screen min-h-[100vh] bg-center bg-no-repeat bg-fixed bg-cover'
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
export default HomeLayout;