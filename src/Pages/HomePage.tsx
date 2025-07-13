import Cookies from 'js-cookie';
import { Typography, Card } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const accessToken = Cookies.get('access_token');

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Card
        title={<Title level={3}>Welcome to Home Page</Title>}
        bordered={false}
        style={{ maxWidth: 800, width: '100%' }}
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
              style={{
                background: '#f5f5f5',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                wordBreak: 'break-word',
              }}
            >
              <Text code>{accessToken}</Text>
            </Paragraph>

            
          </>
        ) : (
          <Text type="danger">No access token found in cookies.</Text>
        )}
      </Card>
    </div>
  );
};

export default HomePage;
