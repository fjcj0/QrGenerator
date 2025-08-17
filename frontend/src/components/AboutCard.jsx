import React from 'react';
const AboutCard = ({ icon, title, paragraph }) => {
    return (
        <div className='flex flex-col items-center font-josefinSans justify-center gap-3 p-5 rounded-lg hover:bg-slate-900/80 border-[0.5px] border-transparent hover:border-white ease transition-colors duration-300'>
            <div className='w-[5rem] h-[5rem] rounded-full bg-violet-700 hover:bg-violet-700/50 border border-white flex items-center justify-center'>
                {icon}
            </div>
            <div className='flex flex-col gap-3 h-[5rem] lg:h-[8rem]'>
            <h2 className='text-white font-bold text-lg text-center'>{title}</h2>
                <p className='text-white/80 text-center text-sm'>{paragraph}</p>
            </div>
        </div>
    );
}
export default AboutCard;