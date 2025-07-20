import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import LoginBg from '../assets/LoginBg.jpg';
import axiosInstance from '../api/interceptor';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginForm.module.scss';
import { useUser } from '../context/UserContext';

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', {
        username: values.email,
        password: values.password,
      });

      if (response.data.requiresPasswordReset) {
        message.warning('Password reset required!');
        navigate(`/${response.data.company}/reset-password`);
        return;
      }

      if (response.data.message === 'success') {
        message.success('Login successful!');
        const fetchUser = async () => {
          try {
            const res = await axiosInstance('/auth/me');
            if (res.status == 200) {
              const data = await res.data;
              setUser({ mail: data.mail, name: data.name, company: data.company, companyURL: data.companyURL });
              setTimeout(() => {
                navigate(`/${res.data.company}/timesheet`);
              }, 100);
            }
          } catch (error) {
            console.error('Auth check failed', error);
          }
        };

        fetchUser();

      }
    } catch (error: any) {
      console.error('Login failed:', error);
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.loginWrapper}
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <Card className={styles.loginCard}>
        <div className={styles.textCenter}>
          <Title level={4}>Welcome Back</Title>
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
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
