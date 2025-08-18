import React, { useState } from 'react';
import useAuthStore from '../../store/authStore.js';
import Loader from '../../tools/Loader.jsx';
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { isLoading, forgotPassword } = useAuthStore();
    const [isSubmit, setSubmit] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setSubmit(true);
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center font-josefinSans">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-950 p-8 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                    Forgot Password
                </h2>
                {!isSubmit ? (
                    <>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 text-black font-josefin bg-white"
                            required
                        />
                        <div className="flex items-center justify-center">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className={`bg-violet-700 p-3 font-josefin text-white py-2 rounded-lg hover:bg-violet-900 transition-colors ${isLoading ? 'opacity-50' : ''}`}
                            >
                                {isLoading ? <Loader/> : 'Send Reset Link'}
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-green-300 mt-4 text-center font-josefin">
                        The reset code has been sent to your email {email} successfully!!
                    </p>
                )}
            </form>
        </div>
    );
};
export default ForgotPasswordPage;