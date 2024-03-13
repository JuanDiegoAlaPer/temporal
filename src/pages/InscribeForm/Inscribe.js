import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom"; 
import "./Inscribe.scss"
import MenuTopAdmin from "../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import MenuSiderAdmin from "../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";
import axios from "axios";

function InscribeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    setModalVisible(true); 
  };

  const handleCancelModal = () => {
    navigate('/admin'); 
    setModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name,
      email,
      comment,

    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "http://localhost:3200/api/v1/events/event",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Te has inscrito exitosamente");
        handleModal();
      } else {
        console.error("Error al inscribirse el evento");
        console.log(response)
      }
    } catch (error) {
      console.error("Error al conectarse con el servidor", error);
      setServerError("Error connecting to the server");
    }

    setName("");
    setEmail("");
    setEventDescription("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  

  return (
    <div className="inscribe-form">
      <MenuSiderAdmin menuCollapsed={menuCollapsed} />
      <MenuTopAdmin
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        Inscríbete al evento
      </h1>
      <div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="card left">
          </div>
          <div className="card right">
            <div className="form-fields">
              <label>
                Nombres y apellidos:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Correo electronico:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Comentarios:
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Categoría del evento:
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>
              
            </div>
          </div>
          <div className="button-container">
            <button className="create-event" type="submit">
              Inscribirse
            </button>
          </div>
          <div className="button-back-container">
            <Link to="/admin">
              <button className="create-event" type="submit">
                Atrás
              </button>
            </Link>
          </div>
        </form>
      </div>
      {serverError && <p>{serverError}</p>}
      <Modal
        title="Te has inscrito exitosamente"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={handleCancelModal}
      >
      </Modal>
    </div>
  );
}

export default InscribeForm;
