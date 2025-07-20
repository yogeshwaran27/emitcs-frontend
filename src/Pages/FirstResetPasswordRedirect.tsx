import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import axiosInstance from '../api/interceptor';
import { useUser } from '../context/UserContext';

const FirstResetPassRedirect: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {setUser} = useUser()
    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            message.error('Invalid password reset link.');
            navigate('/login');
            return;
        }
        const fetchUser = async () => {
            try {
                const res = await axiosInstance('/auth/me');
                if (res.status === 200) {
                    const data = await res.data;
                    setUser({ mail: data.mail, name: data.name, company: data.company, companyURL: data.companyURL });

                    if (location.pathname === '/' && data.company) {
                        navigate(`/${data.company}/timesheet`);
                    }
                }
            } catch (error) {
                console.error('Auth check failed', error);
            }
        };

        
        const validateResetToken = async () => {
            try {
                const response = await axiosInstance.post('/auth/reset-token-store', { token });

                if (response.status === 200 && response.data.message == "success") {
                    fetchUser();
                    navigate(`/${response.data.company}/reset-password`, {
                        state: { firstTimeReset: true }
                    });
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
