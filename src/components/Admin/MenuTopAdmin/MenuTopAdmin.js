import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets/index";
import "./MenuTopAdmin.scss";

function MenuTopAdmin(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className='menuTopAdmin-container'>
      <Button
        style={{
          width: "100px",
          fontSize: 30,
          color: "#000",
          display: "flex",
          flexDirection: "start",
          marginLeft: 8,
        }}
        type='link'
        onClick={() => setMenuCollapsed(!menuCollapsed)}>
        {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className='logo-container'>
        <img className='logoAdmin' src={Logo.logo} alt='Logo CampusConnect' />
      </div>
      <Link>
        <Button
          style={{
            width: "100px",
            fontSize: 30,
            color: "#000",
            display: "flex",
            flexDirection: "start",
            marginLeft: 8,
          }}
          type='link'>
          {<PoweroffOutlined />}
        </Button>
      </Link>
    </div>
  );
}

export default MenuTopAdmin;
