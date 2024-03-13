import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch } from "@material-ui/core";
import { Grid } from "@mui/material";
import "./EventEdit.scss";
import MenuTopAdmin from "../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import MenuSiderAdmin from "../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";

export const EventEdit = () => {
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
  const [menuCollapsed, setMenuCollapsed] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [active, setActive] = useState(false);
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        window.location.href = "/unauthorized";
        return;
      }

      try {
        const token = { token: accessToken };
        const response = await axios.post(
          "http://localhost:3200/api/v1/auth/role",
          token
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch user role");
        }

        const { role } = response.data;

        if (role !== "admin") {
          window.location.href = "/user";
        }
      } catch (error) {
        console.error("Error checking user role:", error);
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
        setActive(response.data.active);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      evenTitle,
      eventSubtitle,
      eventDescription,
      date_at,
      category,
      place,
      capacity,
      image,
      active,
      date: { month, day },
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.patch(
        `http://localhost:3200/api/v1/events/${id}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Evento editado exitosamente");
        navigate(-1);
      } else {
        console.error("Error al crear el evento");
        console.log(response);
      }
    } catch (error) {
      console.error("Error al conectarse con el servidor", error);
      setServerError("Error connecting to the server");
    }

    setEvenTitle("");
    setEventSubtitle("");
    setEventDescription("");
    setDate_at("");
    setCategory("");
    setPlace("");
    setCapacity("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleToggleActive = () => {
    setActive(!active);
  };

  return (
    <div className="index-event-edit">
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
        Editar Evento
      </h1>
      <div>
        <form className="event-edit" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card-edit right">
                <div className="form-fields">
                  <label>
                    Titulo del evento:
                    <input
                      type="text"
                      value={evenTitle}
                      onChange={(e) => setEvenTitle(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Subtitulo del evento:
                    <input
                      type="text"
                      value={eventSubtitle}
                      onChange={(e) => setEventSubtitle(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Descripción del evento:
                    <input
                      type="text"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Fecha del evento:
                    <input
                      type="date"
                      value={date_at}
                      onChange={(e) => {
                        setDate_at(e.target.value);
                        handleDateChange(e);
                      }}
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
                  <label>
                    Locación del evento:
                    <input
                      type="text"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Aforo del evento:
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Activo:
                    <Switch
                      checked={active}
                      onChange={handleToggleActive}
                      color="primary"
                      name="active"
                      inputProps={{
                        "aria-label": "toggle event active status",
                      }}
                    />
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card-edit left">
                <label>
                  Imagen del evento:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    //required
                  />
                </label>
              </div>
            </Grid>
          </Grid>
          <div className="buttons-container-edit">
            <div className="button-container-edit">
              <button className="edit-event" type="submit">
                Crear Evento
              </button>
            </div>
            <div className="button-back-container-edit">
              <Link to="/admin">
                <button className="edit-event" type="submit">
                  Atrás
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      {serverError && <p>{serverError}</p>}
    </div>
  );
};

export default EventEdit;
