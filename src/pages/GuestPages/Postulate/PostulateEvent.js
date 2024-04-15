import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { Grid } from "@mui/material";
import { useNavigate, useParams, Link} from "react-router-dom";
import "./PostulateEvent.scss";
import MenuTop from "../../../components/Guest/MenuTop/MenuTop";
import MenuSider from "../../../components/Guest/MenuSider/MenuSider";
import axios from "axios";

function PostulateEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [evenTitle, setEvenTitle] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [date_at, setDate_at] = useState("");
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3200/api/v1/events/${id}`
        );
        const formattedDate = new Date(response.data.date_at)
          .toISOString()
          .slice(0, 10);
        setEvent(response.data);
        setEvenTitle(response.data.evenTitle);
        setEventSubtitle(response.data.eventSubtitle);
        setEventDescription(response.data.eventDescription);
        setDate_at(formattedDate);
        setCategory(response.data.category);
        setPlace(response.data.place);
        setCapacity(response.data.capacity);

        const selectedDate = new Date(response.data.date_at);
        selectedDate.setDate(selectedDate.getDate() + 1);
        console.log(selectedDate);
        const selectedDay = selectedDate.getDate();
        const selectedMonth = selectedDate
          .toLocaleString("es-ES", {
            month: "short",
          })
          .toUpperCase();
        setDay(selectedDay);
        setMonth(selectedMonth);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    console.log(selectedDate);
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate
      .toLocaleString("es-ES", {
        month: "short",
      })
      .toUpperCase();
    setDay(selectedDay);
    setMonth(selectedMonth);
  };

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    navigate("/admin");
    setModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name,
      email,
      comment,
      phone,
      evenTitle,
      eventSubtitle,
      eventDescription,
      date_at,
      category,
      place,
      capacity,
      image,
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
        console.log("Te has postulado exitosamente");
        handleModal();
      } else {
        console.error("Error al postular el evento");
        console.log(response);
      }
    } catch (error) {
      console.error("Error al conectarse con el servidor", error);
      setServerError("Error connecting to the server");
    };

    setName("");
    setEmail("");
    setComment("");
    setPhone("");
    setEvenTitle("");
    setEventSubtitle("");
    setEventDescription("");
    setDate_at("");
    setCategory("");
    setPlace("");
    setCapacity("");
    setImage(null);
    
  };


  return (
    <div className="postulate-form">
      <MenuSider menuCollapsed={menuCollapsed} />
      <MenuTop
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
        Postula tu evento
      </h1>
      <div>
        <form className="postulate-event-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card right">
              <div className="card-postulate-form right">
                <div className="form-fields-postulate-form">
                <label>
                  Nombre del evento:
                    <input
                      type="text"
                      value={evenTitle}
                      onChange={(e) => setEvenTitle(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                  Fecha tentativa:
                    <input
                      type="date"
                      value={date_at}
                      onChange={(e) => {
                        setDate_at(e.target.value);
                        handleDateChange(e);
                      }}
                      required
                    />
                    <br></br>
                    <br></br>
                  </label>
                  <label>
                  Aforo:
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                  Tema principal:
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                  Descripción:
                    <input
                      type="text"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      required
                    />
                  </label>
                  
                </div>
              </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card-postulate-form left">
                <div className="form-fields-postulate">
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
                  Telefono:
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                  Comentarios:
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </label>
                  
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="buttons-container-postulate-form">
            <div className="button-container-postulate-form">
              <button className="postulate-event" type="submit">
              Enviar
              </button>
            </div>
            <div className="button-back-container-postulate-form">
              <Link to="/">
                <button className="postulate-event" type="submit">
                  Atrás
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      {serverError && <p>{serverError}</p>}
      <Modal
        title="Te has postulado exitosamente"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={handleCancelModal}
      >
      </Modal>
    </div>
  );
}

export default PostulateEvent;