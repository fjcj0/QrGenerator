import React from 'react';
import useColorStore from '../../../store/colorStore.js';
import qrimage from '../../../assets/qr.svg';
import Content from './Content.jsx';
const QrDeploy = () => {
    const { isDarkMode } = useColorStore();
    return (
        <div
            className={`lg:w-[90%] w-[100%] rounded-xl h-[85vh] overflow-y-auto ${isDarkMode ? 'bg-black' : 'bg-white'
                } grid lg:grid-cols-12 grid-cols-1 gap-4`}
        >
            <div className="flex flex-col items-center justify-center lg:col-span-8">
                <Content setUrl={'asf'} url={'14124'} />
                
            </div>
            <div className="lg:col-span-4">
                <div className='h-full w-full p-3 flex flex-col items-center justify-center gap-4'>
                    <div className={`flex items-center justify-start`}>
                        <img src={qrimage} alt="" className='object-contain size-80'/>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <button type='button' className={`${isDarkMode ? 'bg-violet-700 hover:bg-violet-900 text-white' : 'bg-blue-700 hover:bg-blue-900 text-black'}  font-josefinSans px-4 py-3 rounded-lg `}>Download And Save QR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QrDeploy;