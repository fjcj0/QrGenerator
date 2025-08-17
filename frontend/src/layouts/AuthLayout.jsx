import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <div className='w-screen py-5 bg-violet-700 flex-col items-center justify-center'>
      <Outlet/>
    </div>
  );
}
export default AuthLayout;
