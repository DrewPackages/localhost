import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ width: 200, height: '100vh' }}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/running-apps" icon={<AppstoreOutlined />}>
        <Link to="/running-apps">Running Apps</Link>
      </Menu.Item>
    </Menu>
  );
};
