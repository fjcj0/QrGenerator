import React, { useState } from 'react';
import useColorStore from '../../../store/colorStore.js';
import qrimage from '../../../assets/qr.svg';
import Content from './Content.jsx';
import Colors from './Colors.jsx';
import Logo from './Logo.jsx';
import Design from './Design.jsx';
const QrDeploy = () => {
    const { isDarkMode } = useColorStore();
    {/*content states*/}
    const [url, setUrl] = useState(''); 
    {/* */}
    {/*color states*/}
    const [background, setBackground] = useState('#000000'); 
    const [singleColor, setSingleColor] = useState(true);  
    const [colorGradient, setColorGradient] = useState(false);
    const [colorGradient1, setColorGradient1] = useState('#000000');
    const [colorGradient2, setColorGradient2] = useState('#000000');
    const [typeColor, setTypeColor] = useState('linear');
    const [eyeCustom, setEyeCustom] = useState(false);
    const [eyeColor1, setEyeColor1] = useState('#000000'); 
    const [eyeColor2, setEyeColor2] = useState('#000000'); 
    {/* */}
    {/*logo states*/ }
    const [logo, setLogo] = useState(null);
    {/* */ }
    {/*design  states*/ }
    const [bodyShape, setBodyShape] = useState('');
    const [eyeFrameShape, setEyeFrameShape] = useState('');
    const [eyeBallShape, setEyeBallShape] = useState('');
    {/* */}
    return (
        <div
            className={`lg:w-[90%] w-[100%] rounded-xl h-[85vh] overflow-y-auto ${isDarkMode ? 'bg-black' : 'bg-white'
                } grid lg:grid-cols-12 grid-cols-1 gap-4`}
        >
            <div className="flex flex-col items-center justify-center lg:col-span-8 py-5">
                <Content setUrl={setUrl} url={url}/>
                <Colors
                    setBackground={setBackground}
                    background={background}
                    setEyeColor1={setEyeColor1}
                    eyeColor1={eyeColor1}
                    setEyeColor2={setEyeColor2}
                    eyeColor2={eyeColor2}
                    setSingleColor={setSingleColor}
                    singleColor={singleColor}
                    setColorGradient={setColorGradient}
                    colorGradient={colorGradient}
                    setTypeColor={setTypeColor}
                    typeColor={typeColor}
                    setColorGradient1={setColorGradient1}
                    colorGradient1={colorGradient1}
                    setColorGradient2={setColorGradient2}
                    colorGradient2={colorGradient2}
                    setEyeCustom={setEyeCustom}
                    eyeCustom={eyeCustom}
                />
                <Logo
                    setLogo={setLogo}
                    logo={logo} />
                <Design
                    setBodyShape={setBodyShape}
                    bodyShape={bodyShape}
                    setEyeFrameShape={setEyeFrameShape}
                    eyeFrameShape={eyeFrameShape}
                    setEyeBallShape={setEyeBallShape}
                    eyeBallShape={eyeBallShape} />
            </div>
            <div className="lg:col-span-4">
                <div className='h-full w-full p-3 flex flex-col items-center justify-center gap-4'>
                    <div className={`flex items-center justify-start`}>
                        <img src={qrimage} alt="" className='object-contain size-80'/>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <button type='button' className={`${isDarkMode ? 'bg-violet-700 hover:bg-violet-900 text-white' : 'bg-blue-700 hover:bg-blue-900 text-black'}  font-josefinSans px-4 py-3 rounded-lg `}>Download And Save QR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QrDeploy;