import React from 'react';
import { Layout, Typography, Card } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import HeaderBar from '../components/HeaderBar';
import styles from '../styles/Timesheet.module.scss';
import { useUser } from '../context/UserContext';

const { Content } = Layout;
const { Title, Text } = Typography;

const TimesheetPage: React.FC = () => {
  const { mail, name } = useUser();

  return (
    <Layout className={styles.homeLayout}>
      <HeaderBar />
      <Content className={styles.contentWrapper}>
        <Card
          title={<Title level={3}>Welcome to Time Sheet Page</Title>}
          bordered={false}
          className={styles.tokenCard}
        >
          {mail && name ? (
            <>
              Hi {name}! Welcome to Time sheet portal.
            </>
          ) : (
            <Text type="danger">User is Not authenticated</Text>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default TimesheetPage;
