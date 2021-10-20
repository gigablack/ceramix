import React, { useState } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { Link } from "gatsby";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./layout.css";
import { useDID } from "../../Contexts/DID/DIDContext";

const { Header, Sider, Content } = Layout;

const { Title } = Typography;

const SiderDemo = ({ children }) => {
  const [collapsed, setCollapse] = useState(false);
  const { isAuthenticated, profile, isLoading, authenticate } = useDID();

  const toggle = () => {
    setCollapse(!collapsed);
  };
  return (
    <Layout className="container-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Community Data Models</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/data-models">My Data Models</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/schemas">My Schemas</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          {!isAuthenticated && (
            <Button onClick={authenticate} loading={isLoading}>
              Connect Metamask
            </Button>
          )}
          {isAuthenticated && <Title level={4}>{profile?.name}</Title>}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
