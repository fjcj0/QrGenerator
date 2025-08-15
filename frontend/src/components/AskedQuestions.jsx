import React from 'react';
import FAQItem from './FAQItem';
const AskedQuestions = () => {
    const faqData = [
        {
            question: 'What is a QR code?',
            answer: 'QR code stands for Quick Response Code and is a barcode type that was invented by Denso Wave in 1994. Get more information at Wikipedia.'
        },
        {
            question: 'Can I use the generated QR Codes for commercial purposes?',
            answer: 'Yes, all QR codes you created with this QR generator are free and can be used for whatever you want.'
        },
        {
            question: 'Are the created QR codes expiring?',
            answer: 'They do not expire and will work forever! QR Codes created with QRCode Monkey are static and do not stop working after a certain time. You just can’t edit the content of the QR Codes again.'
        },
        {
            question: 'Is there a scan limit for the QR codes?',
            answer: 'There is no limit and the created QR code will work forever. Scan it as many times as you wish!'
        },
        {
            question: 'Is QRCode Monkey saving my data?',
            answer: 'We do not save or reuse your data in any form. We cache your QR code image files for 24h on our server to optimize the performance of QRCode Monkey.'
        },
        {
            question: 'Why is my vCard QR code not showing the correct fields?',
            answer: 'Not all QR code scanners follow the official vCard standard which results in mixed up contact fields. Please try another QR code scanner app for better results.'
        },
        {
            question: 'My QR code is not working, what can I do?',
            answer: 'There are many reasons why a QR code is not working correctly. First, check your entered data. Sometimes there are little typos in your URL that break your QR code. Some QR codes (like vCard) contain a lot of data. Try reducing the data you entered for your QR code when possible. This can make it easier for QR code scanner apps to read your code. Try to remove the logo in your QR code and check if this helps. Also make sure that there is enough contrast between the background and foreground of the QR code. The foreground should always be darker than the background. Here is an article about reasons why your QR codes are not working.'
        },
        {
            question: 'Does QRCode Monkey work in all browsers?',
            answer: 'QRCode Monkey needs a modern HTML5 capable browser and is officially supporting Chrome, Firefox, Safari, Edge and Internet Explorer 11.'
        },
    ];
    return (
        <div className='my-20'>
            <div className='flex flex-col items-center justify-center gap-4  py-3'>
                <h1 className='text-2xl text-white font-josefinSans font-bold'>Frequently <span className='text-blue-700'>Asked Questions</span></h1>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[90%]">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default AskedQuestions;