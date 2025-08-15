import React from 'react';
import CardAdvantage from './CardAdvantage';
const AdvantagesQr = () => {
    const advantages = [
        {
            number: "1",
            title: "Set QR Content",
            paragraph: "Select a content type at the top for your QR code (URL, Text, Email...). After selecting your type you will see all available options. Enter all fields that should appear when scanning your QR code. Make sure everything you enter is correct because you can’t change the content once your QR code is printed."
        },
        {
            number: "2",
            title: "Customize Design",
            paragraph: "You want your QR code to look unique? Set a custom color and replace the standard shapes of your QR code. The corner elements and the body can be customized individually. Add a logo to your QR code. Select it from the gallery or upload your own logo image. You can also start with one of the templates from the template gallery."
        },
        {
            number: "3",
            title: "Generate QR Code",
            paragraph: "Set the pixel resolution of your QR code with the slider. Click the 'Create QR Code' button to see your QR code preview. Please make sure your QR code is working correctly by scanning the preview with your QR Code scanner. Use a high resolution setting if you want to get a PNG code with print quality."
        },
        {
            number: "4",
            title: "Download Image",
            paragraph: "Now you can download the image files for your QR code as .png or .svg, .pdf, .eps vector graphic. If you want a vector format with the complete design please choose .svg. SVG works in software like Adobe Illustrator or Inkscape. The logo and design settings currently only work for .png and .svg files."
        }
    ];
    return (
        <div className='my-20'>
            <div className='flex flex-col items-center justify-center gap-3 font-poppins'>
                <h1 className='text-white text-2xl font-bold text-center'>GET STARTED</h1>
                <p className='text-3xl text-white font-bold text-center'><span className='text-blue-600'>Create</span> your <span className='text-blue-600'>Custom QR Code</span> with <span className='text-blue-600'>Logo</span></p>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 max-w-[90%] mt-8'>
                    {advantages.map((item, index) => (
                        <CardAdvantage
                            key={index}
                            number={item.number}
                            title={item.title}
                            paragraph={item.paragraph}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default AdvantagesQr;