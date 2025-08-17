import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdColorLens, MdFindReplace } from 'react-icons/md';
import useColorStore from '../../../store/colorStore.js';
const Colors = ({
    setBackground, background,
    setEyeFrameColor, eyeFrameColor,
    setEyeBallColor, eyeBallColor,
    setSingleColor, singleColor,
    setColorGradient, colorGradient,
    setColorGradient1, colorGradient1,
    setColorGradient2, colorGradient2,
    setTypeColor, typeColor,
    setEyeCustom, eyeCustom,
    setSingleColorState, singleColorState,
}) => {
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
                    <div className={`flex items-center justify-center w-[2rem] h-[2rem] rounded-md ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                        <MdColorLens className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
                    </div>
                    <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-josefinSans`}>
                        Set Colors
                    </p>
                </div>
                <div>
                    {isOpen ? (
                        <FaMinus className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
                    ) : (
                        <FaPlus className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
                    )}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in ${isOpen ? 'max-h-[60rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-4 px-2 py-2">
                    <h1 className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'} font-poppins font-bold`}>
                        Foreground Color
                    </h1>
                    <div className={`flex flex-wrap gap-4 text-sm font-josefinSans ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="foregroundMode"
                                checked={singleColorState}
                                onChange={() => {
                                    setSingleColorState(true)
                                    setColorGradient(false);
                                }}
                            />
                            Single Color
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="foregroundMode"
                                checked={colorGradient}
                                onChange={() => {
                                    setSingleColorState(false);
                                    setColorGradient(true);
                                }}
                            />
                            Color Gradient
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={eyeCustom}
                                onChange={(e) => setEyeCustom(e.target.checked)}
                            />
                            Custom Eye Color
                        </label>
                    </div>
                    {singleColorState && (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${isDarkMode ? 'bg-violet-700 text-white' : 'bg-blue-700 text-black'}`}>
                            <input
                                type="color"
                                value={singleColor}
                                onChange={(e) => setSingleColor(e.target.value)}
                            />
                            <label>{singleColor}</label>
                        </div>
                    )}
                    {colorGradient && (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${isDarkMode ? 'bg-violet-700 text-white' : 'bg-blue-700 text-black'}`}>
                            <input
                                type="color"
                                value={colorGradient1 || "#000000"}
                                onChange={(e) => setColorGradient1(e.target.value)}
                            />
                            <label>{colorGradient1 || "#000000"}</label>
                            <input
                                type="color"
                                value={colorGradient2 || "#000000"}
                                onChange={(e) => setColorGradient2(e.target.value)}
                            />
                            <label>{colorGradient2 || "#000000"}</label>
                            <button type="button" onClick={() => setTypeColor(typeColor === 'linear' ? 'radial' : 'linear')}>
                                <MdFindReplace className="text-2xl" />
                            </button>
                            <label className="bg-yellow-500 px-4 py-2 rounded-md">{typeColor === 'linear' ? 'Linear Gradient' : 'Radial Gradient'}</label>
                        </div>
                    )}
                </div>
                {eyeCustom && (
                    <div className="flex flex-col gap-4 px-2 py-2">
                        <h1 className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'} font-poppins font-bold`}>
                            Eye Color
                        </h1>
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${isDarkMode ? 'bg-violet-700 text-white' : 'bg-blue-700 text-black'}`}>
                            <input
                                type="color"
                                value={eyeFrameColor}
                                onChange={(e) => setEyeFrameColor(e.target.value)}
                            />
                            <label>{eyeFrameColor}</label>
                            <input
                                type="color"
                                value={eyeBallColor}
                                onChange={(e) => setEyeBallColor(e.target.value)}
                            />
                            <label>{eyeBallColor}</label>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4 px-2 py-2">
                    <h1 className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'} font-poppins font-bold`}>
                        Background Color
                    </h1>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${isDarkMode ? 'bg-violet-700 text-white' : 'bg-blue-700 text-black'}`}>
                        <input
                            type="color"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        />
                        <label>{background}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Colors;