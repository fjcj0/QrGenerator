import React from 'react';
import youtubeqr from '../assets/youtubeqr.svg';
import facebookqr from '../assets/facebookqr.svg';
import ninjaqr from '../assets/ninjaqr.svg';
import jungleqr from '../assets/jungleqr.svg';
import twitterqr from '../assets/twitterqr.svg';
import rainqr from '../assets/rainqr.svg';
import PargraphsAdvantages from './PargraphsAdvantages';
const ExamplesQr = () => {
    const advantagesData = [
        {
            title: 'Endless lifetime with unlimited scans',
            paragraph: "QRCode Monkey also has no limitations. All generated QR codes will work forever, do not expire and have no scanning limits like you see at other commercial QR code generators. The created QR codes are static so the only limitation is that you can't edit the QR code again."
        },
        {
            title: 'QR Codes with Logo',
            paragraph: "Put a custom brand on your QR code. With QRCode Monkey it is very simple and straightforward to add a logo to your QR Code. The QR codes are still readable. Every QR code can have an error correction up to 30%. This means 30% of the QR code (excluding the corner elements) can be removed and the QR code is still working. We can put a logo image on the QR code that covers up to 30%."
        },
        {
            title: 'Custom Design and Colors',
            paragraph: "Make your QR code look really unique with our design and color options. You can customize the shape and form of the corner elements and the body of the QR code. You can also set your own colors for all QR code elements. Add a gradient color to the QR code body and make it really stand out. Attractive QR codes can increase the amount of scans."
        },
        {
            title: 'High resolution QR Codes for Print',
            paragraph: "QRCode Monkey offers print quality QR codes with high resolutions. When creating your QR code set the pixel size to the highest resolution to create .png files in print quality. You can also download vector formats like .svg, .eps, .pdf for best possible quality. We recommend the .svg format because it includes all design settings and gives you the perfect print format that can be used with most vector graphic software."
        },
        {
            title: 'QR Code Vector Formats',
            paragraph: "Most free QR code makers only allow creating QR codes in low resolutions and do not offer vector formats. Use the offered vector formats to print QR Codes in huge resolutions without losing quality. We recommend the .svg format for further editing. The offered .pdf and .eps formats only support classic QR codes without the design and logo options."
        },
        {
            title: 'Free for commercial usage',
            paragraph: "All generated QR Codes are 100% free and can be used for whatever you want. This includes all commercial purposes."
        },
    ];
    const qrImages = [youtubeqr, facebookqr, ninjaqr, jungleqr, twitterqr, rainqr];
    return (
        <div className='my-20'>
            <div className='flex font-josefinSans flex-col items-center justify-center gap-4 bg-black/50 py-3 w-full'>
                <h1 className='text-white text-2xl text-center'>
                    The <span className='font-bold text-violet-700'>Free QR Code Generator</span> for High Quality QR Codes
                </h1>
                <p className='text-sm text-white/50 text-center lg:max-w-[80%] max-w-[90%]'>
                    QRCode Monkey is one of the most popular free online QR code generators with millions of already created QR codes. The high resolution of the QR codes and the powerful design options make it one of the best free QR code generators on the web that can be used for commercial and print purposes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-9 px-4 py-4 mx-auto max-w-[50%] lg:max-w-[80%] xl:max-w-[100%] justify-center">
                    {qrImages.map((src, index) => (
                        <div
                            key={index}
                            className="w-full h-full rounded-lg overflow-hidden transition-all ease duration-300 lg:hover:scale-110"
                        >
                            <img
                                src={src}
                                alt={`QR example ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[90%] py-5'>
                    {advantagesData.map((item, index) => (
                        <PargraphsAdvantages
                            key={index}
                            title={item.title}
                            paragraph={item.paragraph}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ExamplesQr;