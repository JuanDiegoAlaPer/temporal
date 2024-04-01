import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  UserOutlined,
  FormOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./MenuSiderUser.scss";

const { SubMenu } = Menu;

export const MenuSiderUser = (props) => {
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "/user",
      icon: <UserOutlined />,
      label: <span className="navbar-text">Inicio</span>,
    },
    {
      key: "/admin/products",
      icon: <FormOutlined />,
      label: <span className="navbar-text">Calificar Evento</span>,
    },
    {
      key: "/admin/management",
      icon: <AuditOutlined />,
      label: <span className="navbar-text">Postular Evento</span>,
    },
    {
      key: "/user/events",
      icon: <UnorderedListOutlined />,
      label: <span className="navbar-text">Mis Eventos</span>,
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
          <SubMenu
            key={menuItem.key}
            icon={menuItem.icon}
            title={menuItem.label}
          >
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
    <Sider className="menu-sider-user" collapsed={props.menuCollapsed}>
      <Menu
        className="menu-sider-user"
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

export default MenuSiderUser;
