import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import axiosInstance from '../api/interceptor'; // Update path if necessary
import { useUser } from '../context/UserContext';

const FirstResetPassRedirect: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setUser } = useUser();
    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const name = searchParams.get('name');
        if (!token || !email || !name) {
            message.error('Invalid password reset link.');
            navigate('/login');
            return;
        }

        const validateResetToken = async () => {
            try {
                const response = await axiosInstance.post('/auth/reset-token-store', {
                    token,
                    email,
                    name
                });

                if (response.status === 200) {
                    setUser({ mail: email, name: name });
                    navigate('/reset-password');
                } else {
                    message.error('Token validation failed.');
                    navigate('/login');
                }
            } catch (error: any) {
                message.error(
                    error?.response?.data?.message || 'Failed to validate reset token.'
                );
                navigate('/login');
            }
        };

        validateResetToken();
    }, [navigate, searchParams]);

    return null;
};

export default FirstResetPassRedirect;
