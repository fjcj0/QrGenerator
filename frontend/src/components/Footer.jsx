import React from 'react';
import logo from '../assets/logo.png';
import facebooklogo from '../assets/facebook.svg';
import twitterlogo from '../assets/twiiter.svg'; 
const Footer = () => {
    return (
        <div className='bottom-0 left-0 right-0 w-full bg-black/80 flex items-end justify-center'>
            <div className='p-3 flex flex-col items-center justify-center w-full gap-10'>
                <img src={logo} alt='logo' className='object-contain size-52' />
                <div className='flex items-center justify-center gap-4'>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={facebooklogo}
                            alt="Facebook"
                            className="w-10 h-10 hover:scale-110 transition-transform duration-300"
                        />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={twitterlogo}
                            alt="Twitter"
                            className="w-10 h-10 hover:scale-110 transition-transform duration-300"
                        />
                    </a>
                </div>
                <p className='text-extraSmall font-josefinSans text-gray-400'>QR Code is a registered trademark of DENSO WAVE INCORPORATED in the United States and other countries</p>
            </div>
        </div>
    );
}
export default Footer;