import React from 'react';
import { Outlet } from 'react-router-dom';
import bgimage from '../assets/background-dahsbaord.jpg';
const AuthLayout = () => {
  return (
    <div
      className="w-screen min-h-screen py-5 bg-center bg-fixed bg-cover flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <Outlet />
    </div>
  );
};
export default AuthLayout;