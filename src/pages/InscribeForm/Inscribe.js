import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { Grid } from "@mui/material";
import { useNavigate, useParams, Link} from "react-router-dom";
import "./Inscribe.scss";
import MenuTopAdmin from "../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import MenuSiderAdmin from "../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";
import axios from "axios";

function InscribeForm() {
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
        console.log("Te has inscrito exitosamente");
        handleModal();
      } else {
        console.error("Error al inscribirse el evento");
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
        <form className="inscribe-event-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card right">
              <div className="card-edit right">
                <div className="form-fields">
                  <ul>
    
                   <label>Titulo del evento:</label>
                   <span>{evenTitle}</span>
                   <br></br>
                   <label>Subtitulo del evento:</label>
                   <span>{eventSubtitle}</span>
                   <br></br>
                   <span>{image}</span>
                   <br></br>
                   <label>Descripción del evento:</label>
                   <span>{eventDescription}</span>
                   <br></br>
                   <label>Fecha del evento:</label>
                   <span>{date_at}</span>
                   <br></br>
                   <label>Categoría del evento:</label>
                   <span>{category}</span>
                   <br></br>
                   <label>Locación del evento:</label>
                   <span>{place}</span>
                   <br></br>
                   <label>Aforo del evento:</label>
                   <span>{capacity}</span>
      
                  </ul>
                </div>
              </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card left">
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
          <div className="buttons-container">
            <div className="button-container">
              <button className="inscribe-event" type="submit">
              Inscribirse
              </button>
            </div>
            <div className="button-back-container">
              <Link to="/">
                <button className="inscribe-event" type="submit">
                  Atrás
                </button>
              </Link>
            </div>
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
