import React from 'react';
import Cookies from 'js-cookie';
import { Layout, Menu, Dropdown, Avatar, message } from 'antd';
import { LogoutOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/interceptor';
import styles from '../styles/Header.module.scss';

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = Cookies.get('mail');

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      message.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  const menu = (
    <Menu>
      <Menu.Item key="reset-password" icon={<KeyOutlined />} onClick={handleResetPassword}>
        Reset Password
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.headerBar}>
      <div style={{ fontWeight: 'bold', fontSize: 18 }}>EMITCS Portal</div>
      {userEmail && (
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}>
            {userEmail.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      )}
    </Header>
  );
};

export default HeaderBar;
