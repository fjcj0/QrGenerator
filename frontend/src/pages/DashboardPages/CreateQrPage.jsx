import React, { useEffect, useState } from 'react';
import QrDeploy from './components/QrDeploy';
import Loader from '../../tools/Loader';
const CreateQrPage = () => {
    const [loadingPage, setLoadingPage] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className='p-3 min-h-[100vh] flex items-center justify-center'>
            {!loadingPage ? <Loader /> : <QrDeploy />}
        </div>
    );
}
export default CreateQrPage;