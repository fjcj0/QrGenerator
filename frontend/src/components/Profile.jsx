import React, { useState, useRef } from 'react';
import useColorStore from '../store/colorStore.js';
import { FaCamera, FaChevronDown } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import useAuthStore from '../store/authStore.js';
import useSlideStore from '../store/slideStore.js';
import avatar from '../assets/user.png';
import { toast } from 'react-hot-toast';
const Profile = () => {
    const [informationChangeState, setInformationChangeState] = useState(true);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const { isDarkMode } = useColorStore();
    const { user, isAuthenticated, editUser, isLoading } = useAuthStore();
    const { isSlideOpen } = useSlideStore();
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [newFirstName, setNewFirstName] = useState(user?.firstName || '');
    const [newLastName, setNewLastName] = useState(user?.lastName || '');
    const [newUsername, setNewUsername] = useState(user?.username || '');
    const fileInputRef = useRef(null);
    const handleChangeInformation = async (updatedProfile = null) => {
        try {
            if (newUsername === user.username) {
                await editUser(
                    user?._id,
                    null,
                    newFirstName,
                    newLastName,
                    newProfilePicture || updatedProfile
                );
            } else {
                await editUser(
                    user?._id,
                    newUsername,
                    newFirstName,
                    newLastName,
                    newProfilePicture || updatedProfile
                );
            }
            setNewFirstName('');
            setNewLastName('');
            setNewUsername('');
            if (updatedProfile == null) {
                toast.success('Information has been changed successfully!');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong!');
        }
    };
    const handleFileChange = async (e) => {
        const toastId = toast.loading('Wait a couple of seconds, updating profile...');
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(file);
            try {
                await handleChangeInformation(file);
                toast.dismiss(toastId);
                toast.success('Profile Picture has been changed successfully!');
            } catch (error) {
                toast.dismiss(toastId);
                toast.error(error.message || 'Something went wrong!');
            }
        } else {
            toast.dismiss(toastId);
        }
        setNewProfilePicture(null);
    };
    const handleCameraClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className={`${isSlideOpen ? 'flex flex-col items-start justify-start' : 'hidden'} my-5`}>
            <div
                className={`px-3 mx-auto w-[95%] ${isDarkMode
                    ? 'bg-blue-700 border-2 border-dotted border-white'
                    : 'bg-violet-700 border-2 border-dotted border-black'
                    } py-5 rounded-3xl`}
            >
                <div className='flex justify-between items-center w-full'>
                    <div
                        className={`relative w-[5rem] h-[5rem] ${isDarkMode ? 'bg-violet-700' : 'bg-blue-700'
                            } rounded-full flex items-center justify-center overflow-hidden`}
                    >
                        <img
                            src={user?.newProfilePicture == '/' ? avatar : user?.profilePicture}
                            alt='avatar'
                            className='w-full h-full object-cover'
                        />
                        <button
                            type='button'
                            onClick={handleCameraClick}
                            className='absolute bottom-0 w-full bg-black/50 flex justify-center py-1'
                        >
                            <FaCamera className='text-white text-sm' />
                        </button>
                        <input
                            type='file'
                            ref={fileInputRef}
                            className='hidden'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        type='button'
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        className='transition-transform'
                    >
                        <FaChevronDown
                            className={`text-sm transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''
                                } ${isDarkMode ? 'text-white' : 'text-black'}`}
                        />
                    </button>
                </div>
                <div
                    className={`${isDarkMode ? 'text-white' : 'text-black'} overflow-y-auto text-sm font-josefinSans grid grid-cols-1 overflow-hidden transition-all duration-500 ease-in-out ${isDetailsOpen ? 'max-h-96 mt-5' : 'max-h-0'
                        }`}
                >
                    {informationChangeState ? (
                        <div className='grid grid-cols-1 gap-3'>
                            <p>First Name: {isAuthenticated ? user.firstName : 'N/A'}</p>
                            <p>Last Name: {isAuthenticated ? user.lastName : 'N/A'}</p>
                            <p>Username: {isAuthenticated ? user.username : 'N/A'}</p>
                            <p>Email: {isAuthenticated ? user.email : 'N/A'}</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 gap-3 mt-3 font-josefinSans'>
                            <input type='text' placeholder='Enter first name' className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-white text-black placeholder:text-black outline-blue-700' : 'bg-black text-white placeholder:text-white outline-blue-700'}`}
                                defaultValue={user?.firstName}
                                onChange={(e) => setNewFirstName(e.target.value)} />
                            <input type='text' placeholder='Enter last name' className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-white text-black placeholder:text-black outline-blue-700' : 'bg-black text-white placeholder:text-white outline-blue-700'}`}
                                onChange={(e) => setNewLastName(e.target.value)} defaultValue={user?.lastName} />
                            <input type='text' placeholder='Enter username' className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-white text-black placeholder:text-black outline-blue-700' : 'bg-black text-white placeholder:text-white outline-blue-700'}`}
                                onChange={(e) => setNewUsername(e.target.value)} defaultValue={user?.username} />
                            <div className='w-full items-start justify-start'>
                                <button
                                    type='button'
                                    disabled={isLoading}
                                    onClick={() => handleChangeInformation(null)}
                                    className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-4 py-2 rounded-lg font-bold ${isLoading ? 'opacity-50' : ''}`}
                                >
                                    {isLoading ? 'Loading...' : 'Save'}
                                </button>

                            </div>
                        </div>
                    )}
                    <div className='w-full flex items-end justify-end'>
                        <button type='button' onClick={() => setInformationChangeState(!informationChangeState)}>  <MdEdit className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg mt-2`} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;