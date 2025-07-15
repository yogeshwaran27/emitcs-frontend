import React, { useEffect, useState } from 'react';
import { Result, Button, Layout, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import styles from '../styles/NotFoundPage.module.scss';

const { Content } = Layout;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); 

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <Layout className={styles.container}>
      <HeaderBar />
      <Content className={styles.content}>
        {showContent ? (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => navigate('/')}>
                Back Home
              </Button>
            }
          />
        ) : (
          <div className={styles.loader}>
            <Spin size="large" />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
