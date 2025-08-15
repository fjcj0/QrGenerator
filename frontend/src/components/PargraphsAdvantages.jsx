import React from 'react';
const PargraphsAdvantages = ({title,paragraph}) => {
  return (
    <div className='flex flex-col gap-3'>
          <h1 className='text-white text-2xl font-josefinSans font-medium'>{title}</h1>
          <p className='font-josefinSans text-sm text-white/50'>{paragraph}</p>
    </div>
  )
}
export default PargraphsAdvantages;