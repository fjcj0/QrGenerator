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
const App = () => {
  return (
    <Routes>
      {/*Dashboard User Layout*/}
      <Route path='/dashboard' element={<UserDashboardLayout />}>
        <Route index element={<DashboardPage/>} />
        <Route path='/dashboard/qr-codes' element={<QrCodesPage />} />
        <Route path='/dashboard/create-qr' element={<CreateQrPage />} />
      </Route>
      {/**/}

      {/*HomeLayout*/}
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<HomePage/>} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
      {/**/}
    </Routes>
  );
}
export default App;