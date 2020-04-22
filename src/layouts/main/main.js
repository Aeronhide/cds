import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Button } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import menuList from "./menuList";
import "./main.sass";

const Main = (props) => {
  const { Header, Content, Footer, Sider } = Layout;
  const location = useLocation();
  const { children } = props;
  return (
    <div className="main-layout">
      <Layout className="main-layout_section">
        <Header className="layout-header">
          <div className="logo">CDS</div>
          <div className="layout-header_tools">
            <Button type="link" icon={<BellOutlined />} />
            <Avatar
              icon={<UserOutlined />}
              className="layout-header_tools_avatar"
            />
          </div>
        </Header>
        <Layout className="main-layout_section_inner-layout">
          <Sider breakpoint="lg" collapsedWidth="0" theme="light">
            <Menu theme="light" mode="vertical">
              {menuList.map((item, i) => (
                <Menu.Item
                  key={i + 1}
                  className={
                    location.pathname.includes(item.path) &&
                    "ant-menu-item-selected"
                  }
                >
                  <NavLink to={item.path}>
                    {item.icon}
                    <span className="nav-text">{item.title}</span>
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout className="content-layout">
            <Content>
              <div className="content-layout_inner">{children}</div>
            </Content>
            <Footer className="content-layout_footer">
              CDS ©2020 Created by CDS
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
