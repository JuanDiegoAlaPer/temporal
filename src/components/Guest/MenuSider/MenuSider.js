import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuditOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./MenuSider.scss";

const { SubMenu } = Menu;

export const MenuSider = (props) => {
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "/",
      icon: <UserOutlined />,
      label: <span className="navbar-text">Inicio</span>,
    },
    {
      key: "/admin/management",
      icon: <AuditOutlined />,
      label: <span className="navbar-text">Postular Evento</span>,
    },
  ];

  const menuClick = (e) => {
    const path = e.key;
    navigate(path);
  };

  const renderMenuItems = (menuData) => {
    return menuData.map((menuItem) => {
      if (menuItem.subMenu) {
        return (
          <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.label}>
            {renderMenuItems(menuItem.subMenu)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menuItem.key} icon={menuItem.icon}>
            {menuItem.label}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Sider
      className={`menu-sider ${props.menuCollapsed ? 'collapsed' : ''}`}
      collapsed={props.menuCollapsed}
    >
      <Menu
        className="menu-sider"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        onClick={menuClick}
        style={{ width: props.menuCollapsed ? 80 : 200 }}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default MenuSider;
