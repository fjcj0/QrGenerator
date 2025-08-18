import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaUser, FaLock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import QrAnimation from '../../animations/QRCodeAnimation.json';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore.js';
import { toast } from 'react-hot-toast';
import Loader from '../../tools/Loader.jsx';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isUsernameValid = username.trim().length >= 6;
    const isPasswordValid = password.trim().length >= 8;
    const { signin, isLoading, error } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isUsernameValid || !isPasswordValid) {
            toast.error('all fields are required!!');
            return;
        }
        await signin(username, password);
    };
    return (
        <div className='flex items-center justify-center min-h-[100vh] w-full'>
            <div className='flex items-center justify-center w-full'>
                <div className='w-[90%] bg-black/50 grid grid-cols-1 xl:grid-cols-2 p-5 rounded-lg'>
                    <div className='flex items-center justify-center'>
                        <Lottie
                            animationData={QrAnimation}
                            loop={true}
                            style={{ width: 300, height: 300 }}
                        />
                    </div>
                    <div className='flex flex-col justify-start items-center p-5 w-full'>
                        <h1 className='text-white text-2xl font-bold font-poppins text-center mb-6'>Login</h1>
                        <div className='w-full space-y-5 font-josefinSans'>
                            <div className='relative'>
                                <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <input
                                    type='text'
                                    id='username'
                                    className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label
                                    htmlFor='username'
                                    className='absolute left-10 top-2 text-gray-400 text-sm transition-all 
                                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base
                                    peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'
                                >
                                    Username
                                </label>
                            </div>
                            <div className='relative'>
                                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <input
                                    type='password'
                                    id='password'
                                    className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label
                                    htmlFor='password'
                                    className='absolute left-10 top-2 text-gray-400 text-sm transition-all 
                                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base
                                    peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'
                                >
                                    Password
                                </label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button
                                    type='button'
                                    disabled={!(isUsernameValid && isPasswordValid) || isLoading}
                                    onClick={handleSubmit}
                                    className={`border-blue-700 border-[0.2px] px-4 py-2 rounded-lg text-white font-bold font-josefinSans text-xl hover:bg-blue-700
        ${(!(isUsernameValid && isPasswordValid) || isLoading) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
    `}
                                >
                                    {isLoading ? <Loader /> : 'Sign In'}
                                </button>
                            </div>
                            <div>
                                <p className='text-white font-josefinSans text-sm'>
                                    Don’t have an account?{" "}
                                    <Link to={'/sign-up'} className='text-blue-700'>
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 my-3'>
                                <ValidationItem
                                    valid={isPasswordValid}
                                    text="Password length 8"
                                />
                                <ValidationItem
                                    valid={isUsernameValid}
                                    text="Username length 6"
                                />
                            </div>
                            {error && <p className='text-red-500 font-semibold my-2'>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ValidationItem = ({ valid, text }) => (
    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
        {valid ? (
            <FaCheckCircle className='text-green-400' />
        ) : (
            <FaTimesCircle className='text-red-400' />
        )}
        {text}
    </p>
);
export default LoginPage;