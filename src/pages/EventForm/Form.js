import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./Form.scss";
import MenuTopAdmin from "../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import MenuSiderAdmin from "../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";

function EventForm() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);
  const [menuCollapsed, setMenuCollapsed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del evento a tu backend o hacer lo que necesites con ellos
    console.log({
      title,
      caption,
      description,
      date,
      category,
      location,
      capacity,
      image,
    });
    // También puedes resetear el formulario después de enviar los datos
    setTitle("");
    setCaption("");
    setDescription("");
    setDate("");
    setCategory("");
    setLocation("");
    setCapacity("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='index-event-form'>
      <MenuSiderAdmin menuCollapsed={menuCollapsed} />
      <MenuTopAdmin
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div>
        <form className='event-form' onSubmit={handleSubmit}>
          <div className='card left'>
            <label>
              Imagen del evento:
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                required
              />
            </label>
          </div>
          <div className='card right'>
            <div className='form-fields'>
              <label>
                Titulo del evento:
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Subtitulo del evento:
                <input
                  type='text'
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </label>
              <label>
                Descripción del evento:
                <input
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Fecha del evento:
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Categoría del evento:
                <input
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>
              <label>
                Locación del evento:
                <input
                  type='text'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </label>
              <label>
                Aforo del evento:
                <input
                  type='number'
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
        </form>
        <br />
        <button className="create-event" type='submit'>Crear Evento</button>
      </div>
    </div>
  );
}

export default EventForm;
