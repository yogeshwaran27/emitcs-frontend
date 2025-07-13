import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message, Layout } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/interceptor';
import Cookies from 'js-cookie';
import styles from '../styles/ResetPasswordForm.module.scss';
import HeaderBar from '../components/HeaderBar';
import { Content } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const email = Cookies.get('mail');

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

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.homeLayout}>
      <HeaderBar />
      <Content className={styles.contentWrapper}>
        <Card className={styles.resetCard}>
          <div className={styles.textCenter}>
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
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                disabled={loading}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

    </Layout>
  );
};

export default ResetPasswordForm;
