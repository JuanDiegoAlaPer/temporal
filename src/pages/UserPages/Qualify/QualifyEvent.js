import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { Grid } from "@mui/material";
import { useNavigate, useParams, Link} from "react-router-dom";
import "./QualifyEvent.scss";
import MenuTop from "../../../components/User/MenuTopUser/MenuTopUser";
import MenuSider from "../../../components/User/MenuSiderUser/MenuSiderUser";
import axios from "axios";
import Stars from "../../../components/User/QualifyUser/Stars"

function QualifyEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [evenTitle, setEvenTitle] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [date_at, setDate_at] = useState("");
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [capacity, setCapacity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const defaultRating = localStorage.getItem("starRating");

  useEffect(() => {
    const checkUserRole = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
  
      if (!accessToken || !refreshToken) {
        window.location.href = "/unauthorized";
        return;
      }
    };
  
    checkUserRole();
  }, []);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        const response = await axios.post('http://localhost:3200/api/v1/auth/id', {
          token
        });
  
        if (!response.data || !response.data.id) {
          throw new Error('Error al obtener el ID del usuario');
        } else {
          console.log("exitoooo")
        }
  
        const userId = response.data.id;
  
        const userDetailsResponse = await axios.get(`http://localhost:3200/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userDetailsResponse.data) {
          throw new Error('Error al obtener los detalles del usuario');
        }
  
        setUserDetails(userDetailsResponse.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUserData();
  }, []);

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
      capacity
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
      console.log("Calificacion exitosa");
      handleModal();
    } else {
      console.error("Error al calificar el evento");
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

};



  return (
    <div className="qualify-event">
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
        Califica el evento
      </h1>
     
      <div>
        <form className="qualify-event-user" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card right">
              <div className="card-qualify-user right">
                <div className="form-fields-qualify">
                  <ul>
    
                   <span>{image}</span>
                   <br></br>
                   <span>{evenTitle}</span>
                   <br></br>
                   <span>{eventSubtitle}</span>
                   <br></br>
                   <label>Descripción del evento: </label>
                   <span>{eventDescription}</span>
                   <br></br>
                   <label>Fecha del evento: </label>
                   <span>{date_at}</span>
                  
      
                  </ul>
                </div>
              </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card-qualify-user left">
                <div className="form-fields-qualify">
                  <label>
                    Nombres y apellidos:
                    <input
                      type="text"
                      value={userDetails ? userDetails.firstname + " " + userDetails.lastname : ""}
                      disabled 
                    />
                  </label>
                  
                  <label>
                    Correo electronico:
                    <input
                      type="text"
                      value={userDetails ? userDetails.email : ""}
                      disabled
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

                  <label>Califica el evento</label>
                  <Stars iconSize={25} defaultRating={defaultRating} />
                 
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="buttons-container-qualify-user">
            <div className="button-container-qualify-user">
              <button className="qualify-eventform" type="submit">
              Enviar
              </button>
            </div>
            <div className="button-back-container-qualify-user">
              <Link to="/user">
                <button className="qualify-eventform" type="submit">
                  Atrás
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      {serverError && <p>{serverError}</p>}
      <Modal
        title="Calificación exitosa"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={handleCancelModal}
      >
      </Modal>
    </div>
    
    
  );
}

export default QualifyEvent;