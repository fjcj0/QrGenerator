import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import useColorStore from '../../store/colorStore.js';
import Content from './components/Content.jsx';
import Colors from './components/Colors.jsx';
import Logo from './components/Logo.jsx';
import Design from './components/Design.jsx';
import useAuthStore from '../../store/authStore.js';
import { toast } from 'react-hot-toast';
import { useNavigate,useParams } from 'react-router-dom';
import useQrStore from '../../store/qrStore.js';
import Loader from '../../tools/Loader.jsx';
const EditQrPage = () => {
    const { qrId } = useParams();
    const { saveQr, isLoadingButton, getQrById, qrData, error, loading } = useQrStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { isDarkMode } = useColorStore();
    const { isAuthenticated } = useAuthStore();
    const [extension, setExtension] = useState('svg');
    const [url, setUrl] = useState('https://example.com');
    const [name, setName] = useState('');
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
    const [logo, setLogo] = useState(null);
    const [logoCloudaniry, setLogoCloudaniry] = useState(null);
    const [bodyShape, setBodyShape] = useState('square');
    const [eyeFrameShape, setEyeFrameShape] = useState('square');
    const [eyeBallShape, setEyeBallShape] = useState('square');
    const [level, setLevel] = useState('M');
    const [qrNotFound, setQrNotFound] = useState(false);
    const [qrInitialized, setQrInitialized] = useState(false);
    const qrRef = useRef(null);
    const qrCode = useRef(null);
    const initializeQrCode = () => {
        if (qrRef.current) {
            if (qrCode.current) {
                qrRef.current.innerHTML = '';
            }
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
            setQrInitialized(true);
        }
    };
    useEffect(() => {
        initializeQrCode();
    }, []);
    useEffect(() => {
        if (qrCode.current && qrInitialized) {
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
        }
    }, [
        url, logo, bodyShape, eyeFrameShape, eyeBallShape,
        singleColor, colorGradient, colorGradient1, colorGradient2,
        typeColor, background, eyeCustom, eyeFrameColor, eyeBallColor,
        singleColorState, level, qrInitialized
    ]);
    useEffect(() => {
        if (qrId) {
            getQrById(qrId);
        }
    }, [qrId, getQrById]);
    useEffect(() => {
        if (error && error.includes('not found')) {
            setQrNotFound(true);
        } else if (qrData && qrData._id === qrId) {
            setQrNotFound(false);
            setUrl(qrData.url || '');
            setName(qrData.name || '');
            setBodyShape(qrData.config?.dotsOptions?.type || 'square');
            setEyeFrameShape(qrData.config?.cornersSquareOptions?.type || 'square');
            setEyeBallShape(qrData.config?.cornersDotOptions?.type || 'square');
            setLevel(qrData.config?.qrOptions?.errorCorrectionLevel || 'M');
            setBackground(qrData.config?.backgroundOptions?.color || '#ffffff');
            if (qrData.config?.dotsOptions?.gradient) {
                setColorGradient(true);
                setSingleColorState(false);
                setColorGradient1(qrData.config.dotsOptions.gradient.colorStops[0]?.color || '#000000');
                setColorGradient2(qrData.config.dotsOptions.gradient.colorStops[1]?.color || '#000000');
                setTypeColor(qrData.config.dotsOptions.gradient.type || 'linear');
            } else {
                setColorGradient(false);
                setSingleColorState(true);
                setSingleColor(qrData.config?.dotsOptions?.color || '#000000');
            }
            const cornersSquareColor = qrData.config?.cornersSquareOptions?.color;
            const cornersDotColor = qrData.config?.cornersDotOptions?.color;
            const dotsColor = qrData.config?.dotsOptions?.color;
            const shouldEnableEyeCustom = 
                (cornersSquareColor && cornersSquareColor !== (qrData.config?.dotsOptions?.gradient ? '' : dotsColor)) || 
                (cornersDotColor && cornersDotColor !== (qrData.config?.dotsOptions?.gradient ? '' : dotsColor));
            setEyeCustom(shouldEnableEyeCustom);
            if (shouldEnableEyeCustom) {
                setEyeFrameColor(cornersSquareColor || '#000000');
                setEyeBallColor(cornersDotColor || '#000000');
            }
            if (qrData.config?.image) {
                setLogo(qrData.config.image);
            }
            setTimeout(() => {
                initializeQrCode();
            }, 100);
        }
    }, [qrData, qrId, error]);
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
        backgroundOptions: { color: background },
    };
    const saveQrCode = async () => {
        try {
            if (!isAuthenticated) {
                toast.error('You have to login!!');
                navigate('/login');
                return;
            }
            if (user?.totalQr == 0) {
                toast.error('You dont have enough money!!');
                return;
            }
            await saveQr(logoCloudaniry, user?._id, name, qrConfig, qrId, url);
            const fileName = name.trim() ? name.trim().replace(/\s+/g, '_') : 'qr-code';
            qrCode.current.download({ name: fileName, extension: extension });
            toast.success('QR has been saved successfully!!');
        } catch (error) {
            toast.error(error.message);
        }
    };
    if (loading) {
        return (
            <div className='p-3 min-h-[100vh] flex items-center justify-center'> 
                <Loader />
            </div>
        );
    }
    if (qrNotFound || (qrData === null && !loading)) {
        return (
            <div className='p-3 min-h-[100vh] flex items-center justify-center'> 
                <p className='font-bold font-poppins text-2xl text-red-600'>Error 404: QR not found!!</p>
            </div>
        );
    }
    return (
        <div className='p-3 min-h-[100vh] flex items-center justify-center'>
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
                        logoCloudaniry={logoCloudaniry} />
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
                        {isLoadingButton ? <Loader /> : 'Download And Save QR'}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default EditQrPage;