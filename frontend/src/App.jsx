import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import HomeLayout from './layouts/HomeLayout';
import QrCodesPage from './pages/DashboardPages/QrCodesPage';
import SignUpPage from './pages/HomePages/SignUpPage';
import LoginPage from './pages/HomePages/LoginPage';
import CreateQrPage from './pages/DashboardPages/CreateQrPage';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePages/HomePage';
import ForgotPasswordPage from './pages/HomePages/ForgotPasswordPage';
import CodePage from './pages/HomePages/CodePage';
import ResetPasswordPage from './pages/HomePages/ResetPasswordPage';
import AuthLayout from './layouts/AuthLayout';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Loader from './tools/Loader';
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) return children;
  if (!user.isVerified) {
    return <Navigate to="/code" replace />;
  }
  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <div className='w-screen h-screen flex items-center justify-center'><Loader /></div>
  return (
    <>
      <Routes>
        {/*Dashboard User Layout*/}
        <Route path='/dashboard' element={<UserDashboardLayout />}>
          <Route index element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path='/dashboard/qr-codes' element={
            <ProtectedRoute>
              <QrCodesPage />
            </ProtectedRoute>
          } />
          <Route path='/dashboard/create-qr' element={
            <ProtectedRoute>
              <CreateQrPage />
            </ProtectedRoute>} />
        </Route>
        {/**/}
        {/*HomeLayout*/}
        <Route path='/' element={
          <HomeLayout />
        }>
          <Route index element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Route>
        {/**/}
        {/*Authnticatin Layout*/}
        <Route element={<AuthLayout />}>
          <Route
            path="/sign-up"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/code" element={<CodePage />} />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>} />
        </Route>
        {/**/}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;