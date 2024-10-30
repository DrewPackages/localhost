import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const isSidebarHidden = location.state?.isSidebarHidden;

  if (isSidebarHidden) {
    return <></>;
  }
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="h-screen"
    >
      <Menu mode="inline" selectedKeys={[location.pathname]} className="mt-4">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/running-apps" icon={<AppstoreOutlined />}>
          <Link to="/running-apps">Running Apps</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
