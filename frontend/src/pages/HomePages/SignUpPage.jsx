import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import QrAnimation from '../../animations/QRCodeAnimation.json';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import {toast} from 'react-hot-toast';
const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isFirstNameValid = firstName.length >= 6;
    const isLastNameValid = lastName.length >= 6;
    const isUsernameValid = username.length >= 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8;
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (
            !isFirstNameValid ||
            !isLastNameValid ||
            !isUsernameValid ||
            !isEmailValid ||
            !isPasswordValid ||
            password !== confirmPassword
        ) {
            toast.error('Please fill all fields correctly.');
            return; 
        }
        try {
            await signup(username, email, firstName, lastName, password);
            toast.success('Account created successfully!');
            navigate('/code');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message || 'Something went wrong.');
        }
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
                        <h1 className='text-white text-2xl font-bold font-poppins text-center mb-6'>Sign Up</h1>
                        <div className='w-full space-y-5 font-josefinSans'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <div className='relative'>
                                    <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='text'
                                        id='firstname'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='First Name'
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <label htmlFor='firstname' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        First Name
                                    </label>
                                </div>
                                <div className='relative'>
                                    <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='text'
                                        id='lastname'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='Last Name'
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <label htmlFor='lastname' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        Last Name
                                    </label>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <div className='relative'>
                                    <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='text'
                                        id='username'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='Username'
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label htmlFor='username' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        Username
                                    </label>
                                </div>
                                <div className='relative'>
                                    <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='email'
                                        id='email'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor='email' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        Email
                                    </label>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <div className='relative'>
                                    <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='password'
                                        id='password'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='Password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor='password' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        Password
                                    </label>
                                </div>
                                <div className='relative'>
                                    <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                    <input
                                        type='password'
                                        id='rewrite-password'
                                        className='peer block w-full rounded-md border border-gray-400 bg-transparent px-10 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        placeholder='Rewrite Password'
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label htmlFor='rewrite-password' className='absolute left-10 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400'>
                                        Rewrite Password
                                    </label>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='button' disabled={isLoading} onClick={handleSignUp} className='border-blue-700 border-[0.2px] px-4 py-2 rounded-lg text-white font-bold font-josefinSans text-xl hover:bg-blue-700'>
                                    Sign Up
                                </button>
                            </div>
                            <div className=''>
                                <p className='text-white font-josefinSans text-sm'>do you have an account? <Link to={'/login'} className='text-blue-700'>{isLoading ? '....' : 'sign in'}</Link></p>
                            </div>
                            {error && <p className='text-red-500 font-semibold my-2'>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;