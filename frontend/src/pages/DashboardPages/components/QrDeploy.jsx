import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import useColorStore from '../../../store/colorStore.js';
import Content from './Content.jsx';
import Colors from './Colors.jsx';
import Logo from './Logo.jsx';
import Design from './Design.jsx';
import useAuthStore from '../../../store/authStore.js';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useQrStore from '../../../store/qrStore.js';
const QrDeploy = () => {
    const {saveQr,isLoadingButton} = useQrStore();
    const {user} = useAuthStore();
    const navigate = useNavigate();
    const { isDarkMode } = useColorStore();
    const {isAuthenticated} = useAuthStore();
    //file states
    const [extension, setExtension] = useState('svg');
    // content states
    const [url, setUrl] = useState('https://example.com');
    const [name, setName] = useState('');
    // color states
    const [background, setBackground] = useState('#ffffff');
    const [singleColorState, setSingleColorState] = useState(true);
    const [singleColor, setSingleColor] = useState('#000000');
    const [colorGradient, setColorGradient] = useState(false);
    const [colorGradient1, setColorGradient1] = useState('#000000');
    const [colorGradient2, setColorGradient2] = useState('#000000');
    const [typeColor, setTypeColor] = useState('linear');
    const [eyeCustom, setEyeCustom] = useState(false);
    const [eyeFrameColor, setEyeFrameColor] = useState('#000000');
    const [eyeBallColor, setEyeBallColor] = useState('#000000');
    // logo states
    const [logo, setLogo] = useState(null);
    const [logoCloudaniry,setLogoCloudaniry] = useState(null);
    // design states
    const [bodyShape, setBodyShape] = useState('square');
    const [eyeFrameShape, setEyeFrameShape] = useState('square');
    const [eyeBallShape, setEyeBallShape] = useState('square');
    const [level, setLevel] = useState('M'); 
    // qr code ref
    const qrRef = useRef(null);
    const qrCode = useRef(null);
    useEffect(() => {
        qrCode.current = new QRCodeStyling({
            width: 300,
            height: 300,
            type: 'svg',
            data: url,
            margin: 10,
            image: logo,
            qrOptions: {
                errorCorrectionLevel: level || 'M'
            },
            dotsOptions: {
                type: bodyShape,
                color: singleColorState ? singleColor : undefined,
                gradient: colorGradient ? {
                    type: typeColor,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: colorGradient1 },
                        { offset: 1, color: colorGradient2 }
                    ]
                } : undefined
            },
            cornersSquareOptions: {
                type: eyeFrameShape,
                color: eyeCustom ? eyeFrameColor : singleColorState ? singleColor : '#000'
            },
            cornersDotOptions: {
                type: eyeBallShape,
                color: eyeCustom ? eyeBallColor : singleColorState ? singleColor : '#000'
            },
            backgroundOptions: {
                color: background
            }
        });
        qrCode.current.append(qrRef.current);
    }, []);
    useEffect(() => {
        if (!qrCode.current) return;
        qrCode.current.update({
            data: url,
            qrOptions: {
                errorCorrectionLevel: level || 'M'
            },
            image: logo,
            dotsOptions: {
                type: bodyShape,
                color: singleColorState ? singleColor : undefined,
                gradient: colorGradient ? {
                    type: typeColor,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: colorGradient1 },
                        { offset: 1, color: colorGradient2 }
                    ]
                } : undefined
            },
            cornersSquareOptions: {
                type: eyeFrameShape,
                color: eyeCustom ? eyeFrameColor : singleColorState ? singleColor : '#000'
            },
            cornersDotOptions: {
                type: eyeBallShape,
                color: eyeCustom ? eyeBallColor : singleColorState ? singleColor : '#000'
            },
            backgroundOptions: {
                color: background
            }
        });
    }, [
        url, logo, bodyShape, eyeFrameShape, eyeBallShape,
        singleColor, colorGradient, colorGradient1, colorGradient2,
        typeColor, background, eyeCustom, eyeFrameColor, eyeBallColor,
        singleColorState, level
    ]);
    //Qr Config
    const qrConfig = {
        width: 300,
        height: 300,
        type: extension,
        margin: 10,
        qrOptions: { errorCorrectionLevel: level || 'M' },
        dotsOptions: {
            type: bodyShape,
            color: singleColorState ? singleColor : undefined,
            gradient: colorGradient ? {
                type: typeColor,
                rotation: 0,
                colorStops: [
                    { offset: 0, color: colorGradient1 },
                    { offset: 1, color: colorGradient2 }
                ]
            } : undefined
        },
        cornersSquareOptions: {
            type: eyeFrameShape,
            color: eyeCustom ? eyeFrameColor : singleColorState ? singleColor : '#000'
        },
        cornersDotOptions: {
            type: eyeBallShape,
            color: eyeCustom ? eyeBallColor : singleColorState ? singleColor : '#000'
        },
        backgroundOptions: { color: background }
    };    
    const saveQrCode = async () => {
        try{
            if(!isAuthenticated){
                toast.error('You have to login!!');
                navigate('/login');
                return;
             }
             await saveQr(logoCloudaniry,user?._id,name,qrConfig,null,url);
            const fileName = name.trim() ? name.trim().replace(/\s+/g, '_') : 'qr-code';
            qrCode.current.download({ name: fileName, extension: extension });
            toast.success('QR has been saved successfully!!');
        }catch(error){
            toast.error(error.message);
        }
    };
    return (
        <div className={`lg:w-[90%] w-[100%] rounded-xl h-[85vh] overflow-y-auto ${isDarkMode ? 'bg-black' : 'bg-white'} grid lg:grid-cols-12 grid-cols-1 gap-4`}>
            <div className="flex flex-col items-center justify-center lg:col-span-8 py-5">
                <Content
                    setUrl={setUrl}
                    url={url}
                    setName={setName}
                    name={name} />
                <Colors
                    setBackground={setBackground}
                    background={background}
                    setEyeFrameColor={setEyeFrameColor}
                    eyeFrameColor={eyeFrameColor}
                    setEyeBallColor={setEyeBallColor}
                    eyeBallColor={eyeBallColor}
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
                    setSingleColorState={setSingleColorState}
                    singleColorState={singleColorState}
                />
                <Logo
                    setLogo={setLogo}
                    logo={logo} 
                    setLogoCloudaniry={setLogoCloudaniry}
                    logoCloudaniry={logoCloudaniry}/>
                <Design
                    setBodyShape={setBodyShape}
                    bodyShape={bodyShape}
                    setEyeFrameShape={setEyeFrameShape}
                    eyeFrameShape={eyeFrameShape}
                    setEyeBallShape={setEyeBallShape}
                    eyeBallShape={eyeBallShape}
                    setLevel={setLevel}
                    level={level} />
            </div>
            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4 p-3">
                <div ref={qrRef} className="qr-code-preview"></div>
                <div className="relative w-48">
                    <select
                    value={extension}
                        onChange={(e) => setExtension(e.target.value)}
                        className={`appearance-none w-full p-4 rounded-lg font-josefinSans 
                          ${isDarkMode
                                ? 'bg-violet-700 text-white hover:bg-violet-900'
                                : 'bg-blue-700 text-black hover:bg-blue-900'
                            }`}
                    >
                        <option value="svg">Svg</option>
                        <option value="png">Png</option>
                    </select>
                    {/* Arrow icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                            className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <button
                    type='button'
                    disabled={isLoadingButton}
                    className={`${isDarkMode ? 'bg-violet-700 hover:bg-violet-900 text-white' : 'bg-blue-700 hover:bg-blue-900 text-black'} font-josefinSans px-4 py-3 rounded-lg ${isLoadingButton ? 'opacity-50' : ''}`}
                    onClick={saveQrCode}
                >
                    Download And Save QR
                </button>
            </div>
        </div>
    );
};
export default QrDeploy;