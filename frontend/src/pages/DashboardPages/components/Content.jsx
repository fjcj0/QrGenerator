import React, { useState } from 'react';
import useColorStore from '../../../store/colorStore.js';
import { FaPlus, FaMinus, FaInfo } from 'react-icons/fa';
const Content = ({ setUrl, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useColorStore();
    return (
        <div className="flex flex-col gap-4 w-full px-3">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-sm p-3 ${isDarkMode
                    ? 'bg-violet-700 hover:bg-violet-700/40'
                    : 'bg-blue-700 hover:bg-blue-700/40'
                    } flex items-center justify-between`}
            >
                <div className="flex items-center justify-start gap-3">
                    <div
                        className={`flex items-center justify-center w-[2rem] h-[2rem] rounded-md ${isDarkMode ? ' bg-black' : ' bg-white'
                            }`}
                    >
                        <FaInfo
                            className={`${isDarkMode ? ' text-white' : ' text-black'
                                } text-lg`}
                        />
                    </div>
                    <p
                        className={`${isDarkMode ? 'text-white' : 'text-black'
                            } text-lg font-josefinSans`}
                    >
                        Content
                    </p>
                </div>
                <div>
                    {isOpen ? (
                        <FaMinus
                            className={`${isDarkMode ? 'text-white' : 'text-black'
                                } text-lg`}
                        />
                    ) : (
                        <FaPlus
                            className={`${isDarkMode ? 'text-white' : 'text-black'
                                } text-lg`}
                        />
                    )}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in ${isOpen ? 'max-h-[6.5rem] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="flex flex-col items-start justify-start gap-4 px-2 py-2">
                    <h1
                        className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'
                            } font-poppins font-bold`}
                    >
                        Url
                    </h1>
                    <input
                        type="text"
                        placeholder="https://"
                        value={url}  
                        onChange={(e) => setUrl(e.target.value)}
                        className={`${isDarkMode
                            ? 'bg-violet-700 placeholder:text-white text-white hover:bg-violet-700/40'
                            : 'bg-blue-700 placeholder:text-black text-black hover:bg-blue-700/40'
                            } outline-none w-full font-josefinSans px-2 py-2 rounded-sm placeholder:text-sm text-sm`}
                    />
                </div>
            </div>
        </div>
    );
};
export default Content;