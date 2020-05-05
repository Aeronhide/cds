import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu, Dropdown, Button } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import menuList from "./menuList";
import { logout } from "../../actions";
import Notifications from "../../components/notifications/notifications";
import "./main.sass";

const Main = (props) => {
  const { Header, Content, Footer, Sider } = Layout;
  const location = useLocation();
  const { children } = props;
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const menu =
    localStorage.getItem("user") === "student"
      ? menuList.filter(
          (m) => m.title !== "Themes" && m.title !== "Setting exams"
        )
      : menuList;

  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => props.logout()} icon={<PoweroffOutlined />}>
          Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="main-layout">
      <Notifications
        visibleDrawer={visibleDrawer}
        setVisibleDrawer={setVisibleDrawer}
      />
      <Layout className="main-layout_section">
        <Header className="layout-header">
          <div className="logo">CDS</div>
          <div className="layout-header_tools">
            <Button
              onClick={() => setVisibleDrawer(true)}
              type="link"
              icon={<BellOutlined />}
            />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button
                shape="circle"
                className="layout-header_tools_avatar"
                icon={<SettingOutlined />}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </div>
        </Header>
        <Layout className="main-layout_section_inner-layout">
          <Sider breakpoint="lg" collapsedWidth="0" theme="light">
            <Menu theme="light" mode="vertical">
              {menu.map((item, i) => (
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

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Main);
