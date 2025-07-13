import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';

const FirstResetPassRedirect: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        Cookies.remove('access_token');
        Cookies.remove('email');
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('email', { path: '/' });
        if (!token || !email) {
            console.log("herererer")
            message.error('Invalid password reset link.');
            navigate('/login');
            return;
        }
        console.log(token,email)    
        const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('access_token', token, { expires: oneHourFromNow }); 
        Cookies.set('email', email, { expires: oneHourFromNow });

        navigate('/reset-password');
    }, [navigate, searchParams]);

    return null; 
};

export default FirstResetPassRedirect;
