import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuSiderUser from "../../../components/User/MenuSiderUser/MenuSiderUser";
import { Input, Select, Modal } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./MyEvents.scss";
import { ActivityCardMyEvents } from "../../../components/User/ActivityCardMyEvents/ActivityCardMyEvents";
import MenuTopUser from "../../../components/User/MenuTopUser/MenuTopUser";

const { Option } = Select;

export const MyEvents = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:3200/api/v1/auth/id",
          {
            token,
          }
        );

        if (!response.data || !response.data.id) {
          throw new Error("Error al obtener el ID del usuario");
        }

        const userId = response.data.id;

        const userDetailsResponse = await axios.get(
          `http://localhost:3200/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userDetailsResponse.data) {
          throw new Error("Error al obtener los detalles del usuario");
        }

        setUserDetails(userDetailsResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsData = [];

        for (const eventId of userDetails.events) {
          const response = await axios.get(
            `http://localhost:3200/api/v1/events/${eventId}`
          );

          eventsData.push(response.data);
        }

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    if (userDetails && userDetails.events) {
      fetchEventData();
    }
  }, [userDetails]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setSelectedCategory(value === "all" ? null : value);
  };

  const handleUnsubscribe = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const confirmUnsubscribe = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3200/api/v1/auth/id",
        {
          token,
        }
      );

      if (!response.data || !response.data.id) {
        throw new Error("Error al obtener el ID del usuario");
      }

      const userId = response.data.id;
      const eventId = selectedEvent._id;

      const userDetailsResponse = await axios.delete(
        `http://localhost:3200/api/v1/users/user/${userId}/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userDetailsResponse.data) {
        throw new Error("Error al eliminar el evento");
      }

      console.log("Desinscripción confirmada para el evento:", selectedEvent);
      window.location.reload();
    } catch (error) {
      console.error("Error al desinscribirse del evento:", error);
    } finally {
      setShowModal(false);
    }
  };

  const cancelUnsubscribe = () => {
    setShowModal(false);
  };

  const filteredEventsTitle = events.filter(
    (event) =>
      event.evenTitle &&
      event.evenTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredEvents = events.filter(
    (event) =>
      event.active &&
      event.evenTitle &&
      event.evenTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const categories = [
    ...new Set(filteredEvents.map((event) => event.category)),
  ];

  const eventsByCategory = filteredEvents.reduce((acc, event) => {
    acc[event.category] = acc[event.category] || [];
    acc[event.category].push(event);
    return acc;
  }, {});

  return (
    <div className="myevents">
      hola
      <MenuSiderUser menuCollapsed={menuCollapsed} />
      <MenuTopUser
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div className="container-myevents">
        <div className="search-card-myevents">
          <Input
            className="search-input-myevents"
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <Select
            placeholder="Filtrar"
            className="custom-select-myevents"
            onChange={handleSelectChange}
            suffixIcon={
              <UnorderedListOutlined style={{ color: "rgba(0,0,0,.85)" }} />
            }
          >
            <Option value="all">Todo</Option>
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <div className="events-container-myevents">
          {selectedCategory === null ? (
            categories.map((category) => (
              <div key={category} className="category-row-myevents">
                <h1>{category}</h1>
                <div className="activity-cards-row-myevents">
                  {eventsByCategory[category].map((event) => (
                    <div key={event._id}>
                      <ActivityCardMyEvents event={event} />
                      <button onClick={() => handleUnsubscribe(event)}>
                        Desinscríbete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row-myevents">
              <h1 style={{ marginLeft: 100 }}>{selectedCategory}</h1>
              <div className="activity-cards-row-myevents">
                {eventsByCategory[selectedCategory].map((event) => (
                  <div key={event._id}>
                    <ActivityCardMyEvents event={event} />
                    <button
                      onClick={() => handleUnsubscribe(event)}
                      className="myEventButton"
                    >
                      Desinscríbete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title={`¿Estás seguro que quieres desinscribirte de "${selectedEvent?.evenTitle}"?`}
        visible={showModal}
        onOk={confirmUnsubscribe}
        onCancel={cancelUnsubscribe}
      >
      </Modal>
    </div>
  );
};

export default MyEvents;
