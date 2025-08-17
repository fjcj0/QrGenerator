import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import HomeLayout from './layouts/HomeLayout';
import QrCodesPage from './pages/DashboardPages/QrCodesPage';
import SignUpPage from './pages/HomePages/SignUpPage';
import LoginPage from './pages/HomePages/LoginPage';
import CreateQrPage from './pages/DashboardPages/CreateQrPage';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import HomePage from './pages/HomePages/HomePage';
import ForgotPasswordPage from './pages/HomePages/ForgotPasswordPage';
import CodePage from './pages/HomePages/CodePage';
import ResetPasswordPage from './pages/HomePages/ResetPasswordPage';
import AuthLayout from './layouts/AuthLayout';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <Routes>
        {/*Dashboard User Layout*/}
        <Route path='/dashboard' element={<UserDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='/dashboard/qr-codes' element={<QrCodesPage />} />
          <Route path='/dashboard/create-qr' element={<CreateQrPage />} />
        </Route>
        {/**/}

        {/*HomeLayout*/}
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        {/**/}
        {/*Authnticatin Layout*/}
        <Route element={<AuthLayout />}>
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/code" element={<CodePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        </Route>
        {/**/}
      </Routes>
      <Toaster />
    </>
  );
}
export default App;