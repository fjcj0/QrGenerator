import React from 'react';
const CardAdvantage = ({ number, title, paragraph }) => {
    return (
        <div className='flex items-start gap-3 font-josefinSans'>
            <div className='flex items-center justify-center'>
                <h1 className='text-center text-white text-xl font-bold'>
                    {number}
                </h1>
            </div>
            <div className='flex flex-col items-start gap-3'>
                <h1 className='text-white text-md font-bold'>{title}</h1>
                <p className='text-white/80 text-sm'>{paragraph}</p>
            </div>
        </div>
    );
}
export default CardAdvantage;