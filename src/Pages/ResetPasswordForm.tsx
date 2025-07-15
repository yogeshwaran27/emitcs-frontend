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
  const [confirmPassword, setConfirmPassword] = useState('');

  const email = Cookies.get('mail');
  const [password, setPassword] = useState('');

  const passwordValidations = [
    {
      label: 'At least 8 characters',
      isValid: password.length >= 8,
    },
    {
      label: 'Contains at least 1 number',
      isValid: /\d/.test(password),
    },
    {
      label: 'Contains at least 1 special character',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
  const isPasswordStrong = passwordValidations.every((rule) => rule.isValid);
  
  if (!email) {
    message.error('Missing email. Please login again.');
    navigate('/login');
    return null;
  }

  const onFinish = async (values: any) => {
    if (password !== confirmPassword) {
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
            >
              <>
                <Input.Password
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {password && (
                  <div style={{ marginTop: '8px' }}>
                    {passwordValidations.map((rule, index) => (
                      <div
                        key={index}
                        style={{
                          color: rule.isValid ? 'green' : 'red',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>{rule.isValid ? '✅' : '❌'}</span>
                        <span>{rule.label}</span>
                      </div>
                    ))}
                  </div>
                )}

              </>
            </Form.Item>


            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (!password) {
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.reject(new Error('Please confirm your password!'));
                    }
                    if (value !== password) {
                      return Promise.reject(new Error('Passwords do not match'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={loading || !isPasswordStrong || (password!=confirmPassword)}
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
