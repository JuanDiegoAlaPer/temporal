import React from "react";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/index";
import "./MenuTop.scss";

function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menuTop-container">
      <Button
        style={{
          width: "100px",
          fontSize: 30,
          color: "#000",
          display: "flex",
          flexDirection: "start",
          marginLeft: 8,
        }}
        type="link"
        onClick={() => setMenuCollapsed(!menuCollapsed)}
      >
        {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className="logo-container">
        <img className="logo" src={Logo.logo} alt="Logo CampusConnect" />
      </div>
      <Link to="/login">
        <Button
          style={{
            width: "100px",
            fontSize: 30,
            color: "#000",
            display: "flex",
            flexDirection: "start",
            marginLeft: 8,
          }}
          type="link"
        >
          {<UserOutlined />}
        </Button>
      </Link>
    </div>
  );
}

export default MenuTop;
