import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./Form.scss";
import MenuTopAdmin from "../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import MenuSiderAdmin from "../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";

function EventForm() {
  const [evenTitle, setEvenTitle] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [date_at, setDate_at] = useState("");
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);
  const [menuCollapsed, setMenuCollapsed] = useState(true);

  const handleSubmit = (e) => {
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
      date: { month, day }
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
        console.log("Evento creado exitosamente");
        // Lógica adicional después de crear el evento
      } else {
        console.error("Error al crear el evento");
        console.log(response)
        // Manejo de errores
      }
    } catch (error) {
      console.error("Error al conectarse con el servidor", error);
      // Manejo de errores de conexión
      setServerError("Error connecting to the server");
    }

    // Limpiar los campos después del envío exitoso
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

  return (
    <div className="index-event-form">
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
        Crear Evento
      </h1>
      <div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="card left">
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
          <div className="card right">
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
            </div>
          </div>
          <div className="button-container">
            <button className="create-event" type="submit">
              Crear Evento
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
    </div>
  );
}

export default EventForm;
