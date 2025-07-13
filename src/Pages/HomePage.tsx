import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from '../styles/HomePage.module.scss';
import Homebg from '../assets/home.jpg';
const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const token = Cookies.get('access_token');

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf} style={{ backgroundImage: `url(${Homebg})` }}>
        {/* Could add a background image or color */}
      </div>

      <div className={styles.rightHalf}>
        {/* Animated background circles */}
        <div className={styles.circle} style={{ animationDelay: '0s' }}></div>
        <div className={styles.circle} style={{ animationDelay: '2s' }}></div>
        <div className={styles.circle} style={{ animationDelay: '4s' }}></div>
        <div className={styles.circle} style={{ animationDelay: '1s' }}></div>
        <div className={styles.circle} style={{ animationDelay: '3s' }}></div>

        <div className={styles.content}>
          <Title level={2}>Welcome to the Time Sheet Portal</Title>

          {!token ? (
            <>
              <Text className={styles.signinMessage}>Sign in to view your portal</Text>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Text className={styles.signinMessage}>Ready to manage your time sheets</Text>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/timesheet')}
              >
                Go to Time Sheet Portal
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;