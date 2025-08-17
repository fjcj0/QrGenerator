import React, { useState } from 'react';
import useColorStore from '../../../store/colorStore.js';
import { FaPlus, FaMinus, FaShapes } from 'react-icons/fa';
import { bodyShapes, eyeFrames, eyeBalls, levels } from '../../../data.js';
const Design = ({ setBodyShape, bodyShape, setEyeFrameShape, eyeFrameShape, setEyeBallShape, eyeBallShape, setLevel, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useColorStore();
    const getBorderClass = (selected, current) => selected === current ? 'border-yellow-400' : 'border-white';
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
                        className={`flex items-center justify-center w-[2rem] h-[2rem] rounded-md ${isDarkMode ? 'bg-black' : 'bg-white'}`}
                    >
                        <FaShapes className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg`} />
                    </div>
                    <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-josefinSans`}>
                        Customize Design
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
            <div className={`overflow-hidden transition-all duration-500 ease-in ${isOpen ? 'max-h-[37rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col items-start justify-start gap-4 px-2 py-2 font-josefinSans">
                    {/* Body Shapes */}
                    <div className='flex flex-col gap-4 items-start justify-start'>
                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Body Shapes</h1>
                        <div className='grid md:grid-cols-5 grid-cols-2 gap-3'>
                            {bodyShapes.map(shape => (
                                <button
                                    key={shape.id}
                                    onClick={() => setBodyShape(shape.qrType)}
                                    className={`flex flex-col w-[5rem] h-[5rem] items-center justify-center rounded-md border-[1.5px] ${getBorderClass(bodyShape, shape.qrType)} bg-white hover:border-yellow-400`}
                                >
                                    <img src={shape.src} alt={shape.alt} className='w-full rounded-md' />

                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Eye Frames */}
                    <div className='flex flex-col gap-4 items-start justify-start'>
                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Eye Frames</h1>
                        <div className='grid md:grid-cols-5 grid-cols-2 gap-3'>
                            {eyeFrames.map(frame => (
                                <button
                                    key={frame.id}
                                    onClick={() => setEyeFrameShape(frame.qrType)}
                                    className={`flex flex-col w-[5rem] h-[5rem] items-center justify-center rounded-md border-[1.5px] ${getBorderClass(eyeFrameShape, frame.qrType)} bg-white hover:border-yellow-400`}
                                >
                                    <img src={frame.src} alt={frame.alt} className='w-full rounded-md' />

                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Eye Balls */}
                    <div className='flex flex-col gap-4 items-start justify-start'>
                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Eye Balls</h1>
                        <div className='grid md:grid-cols-5 grid-cols-2 gap-3'>
                            {eyeBalls.map(ball => (
                                <button
                                    key={ball.id}
                                    onClick={() => setEyeBallShape(ball.qrType)}
                                    className={`flex flex-col w-[5rem] h-[5rem] items-center justify-center rounded-md border-[1.5px] ${getBorderClass(eyeBallShape, ball.qrType)} bg-white hover:border-yellow-400`}
                                >
                                    <img src={ball.src} alt={ball.alt} className='w-full rounded-md' />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/*Level*/}
                    <div className='flex flex-col gap-4 items-start justify-start'>
                        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Error Correction Level</h1>
                        <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
                            {levels.map(lv => (
                                <button
                                    key={lv.id}
                                    onClick={() => setLevel(lv.level)}
                                    className={`flex flex-col w-[5rem] h-[5rem] items-center justify-center rounded-md border-[1.5px] ${getBorderClass(level, lv.level)} ${isDarkMode ? ' bg-black' : 'bg-white'} hover:border-yellow-400`}
                                >
                                    <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-josefinSans`}>{lv.level}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Design;