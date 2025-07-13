import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Card, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import LoginBg from "../assets/LoginBg.jpg";
import axiosInstance from '../api/interceptor';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
    const navigate=useNavigate()
    const onFinish = async (values: any) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username: values.email,
                password: values.password,
            });
            
            const accessToken = response.data.access_token;
            const mail=response.data.mail
            if (accessToken) {
                const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set('access_token', accessToken, {
                    expires: oneHourFromNow, 
                    secure: true,
                    sameSite: 'Strict',
                });
                Cookies.set('email', mail, {
                    expires: oneHourFromNow, 
                    secure: true,
                    sameSite: 'Strict',
                });
                if (response.data.requiresPasswordReset) {
                    message.warning('Password reset required!');
                    navigate('/reset-password');
                    return;
                }
                setTimeout(() => {
                    message.success('Login successful!');
                    navigate('/')
                }, 100);
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            message.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div
            className="login content"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backgroundImage: `url(${LoginBg})`,
                backgroundBlendMode: 'lighten',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                style={{
                    width: 400,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    borderRadius: 10,
                }}
            >
                <div className="text-center mb-6">
                    <Title level={4} style={{ marginTop: 8 }}>
                        Welcome Back
                    </Title>
                    <Text type="secondary">Sign in to your timesheet portal</Text>
                </div>

                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-between items-center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="#">Forgot password?</a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
