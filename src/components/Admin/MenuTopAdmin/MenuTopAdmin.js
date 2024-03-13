import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useAuth } from '../../../AuthContext';
import { useNavigate } from "react-router-dom"; 
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Logo } from "../../../assets/index";
import "./MenuTopAdmin.scss";

function MenuTopAdmin(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setModalVisible(true); 
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/'); 
    setModalVisible(false);
  };

  return (
    <div className="menuTopAdmin-container">
      <Button
        className="menu-button"
        type="link"
        onClick={() => setMenuCollapsed(!menuCollapsed)}
      >
        {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className="logo-container">
        <img className="logoAdmin" src={Logo.logo} alt="Logo CampusConnect" />
      </div>
      <Button
        className="menu-button"
        type="link"
        onClick={handleLogout}
      >
        {<PoweroffOutlined />}
      </Button>
      <Modal
        title="Confirmar cierre de sesión"
        visible={modalVisible}
        onOk={handleConfirmLogout}
        onCancel={() => setModalVisible(false)}
      >
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </Modal>
    </div>
  );
}

export default MenuTopAdmin;
