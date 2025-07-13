import React from 'react';
import Cookies from 'js-cookie';
import { Layout, Typography, Card } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import HeaderBar from '../components/HeaderBar';
import styles from '../styles/Timesheet.module.scss';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TimesheetPage: React.FC = () => {
  const accessToken = Cookies.get('access_token');

  return (
    <Layout className={styles.homeLayout}>
      <HeaderBar />
      <Content className={styles.contentWrapper}>
        <Card
          title={<Title level={3}>Welcome to Time Sheet Page</Title>}
          bordered={false}
          className={styles.tokenCard}
        >
          {accessToken ? (
            <>
              <Paragraph>
                <Text strong>Your Access Token:</Text>
              </Paragraph>
              <Paragraph
                copyable={{
                  text: accessToken,
                  tooltips: ['Copy token', 'Token copied'],
                  icon: <CopyOutlined />,
                }}
                className={styles.tokenBox}
              >
                <Text code>{accessToken}</Text>
              </Paragraph>
            </>
          ) : (
            <Text type="danger">No access token found in cookies.</Text>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default TimesheetPage;
