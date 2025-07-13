import React from 'react';
import { Layout, Typography, Button } from 'antd';
import styles from '../styles/HomePage.module.scss';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout className={styles.timesheetLayout}>
      <Header className={styles.timesheetHeader}>
        <Title level={3} className={styles.headerTitle}>Time Sheet Portal</Title>
      </Header>

      <Content className={styles.timesheetContent}>
        <div className={styles.welcomeCard}>
          <Title level={4}>Welcome to the Time Sheet Portal</Title>
          <Text>
            Manage your daily work hours easily and efficiently. 
            Track your tasks and submit your timesheets on time.
          </Text>

          <div className={styles.actionRow}>
            <Button type="primary" size="large">Log Time</Button>
            <Button size="large">View Timesheets</Button>
            <Button danger size="large">Logout</Button>
          </div>
        </div>
      </Content>

      <Footer className={styles.timesheetFooter}>
        Time Sheet Portal ©2025 Created by YourCompany
      </Footer>
    </Layout>
  );
};

export default HomePage;
