import React from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/interceptor';
import Cookies from 'js-cookie';

const { Title, Text } = Typography;

const ResetPasswordForm: React.FC = () => {
    const navigate = useNavigate();

    const email = Cookies.get('email');

    if (!email) {
        message.error('Missing email. Please login again.');
        navigate('/login');
        return null;
    }

    const onFinish = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        try {
            await axiosInstance.put('/users/reset-password', {
                email,
                newPassword: values.password,
            });

            message.success('Password updated successfully. Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Password reset failed:', error);
            message.error('Failed to reset password. Please try again.');
        }
    };

    return (
        <div
            className="reset-password content"
            style={{
                backgroundColor: '#f4f4f4',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card style={{ width: 400, boxShadow: '0 8px 30px rgba(0,0,0,0.1)', borderRadius: 10 }}>
                <div className="text-center mb-6">
                    <Title level={4}>Reset Password</Title>
                    <Text type="secondary">Set a new password for your account</Text>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter a new password!' }]}
                    >
                        <Input.Password
                            placeholder="New Password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Update Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;
