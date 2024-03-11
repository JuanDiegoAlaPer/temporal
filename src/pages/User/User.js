import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuSiderUser from "../../components/User/MenuSiderUser/MenuSiderUser";
import { Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./User.scss";
import { ActivityCardUser } from "../../components/User/ActivityCardUser/ActivityCardUser";
import MenuTopUser from "../../components/User/MenuTopUser/MenuTopUser";

const { Option } = Select;

export const User = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [events, setEvents] = useState([]);

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
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/v1/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setSelectedCategory(value === "all" ? null : value);
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
    <div className="user">
      <MenuSiderUser menuCollapsed={menuCollapsed} />
      <MenuTopUser
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div className="container-user">
        <div className="search-card-user">
          <Input
            className="search-input-user"
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <Select
            placeholder="Filtrar"
            className="custom-select-user"
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
        <div className="events-container-user">
          {selectedCategory === null ? (
            categories.map((category) => (
              <div key={category} className="category-row-user">
                <h1 style={{ marginLeft: 100 }}>{category}</h1>
                <div className="activity-cards-row-user">
                  {eventsByCategory[category].map((event) => (
                    <ActivityCardUser key={event._id} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row-user">
              <h1 style={{ marginLeft: 100 }}>{selectedCategory}</h1>
              <div className="activity-cards-row-ser">
                {eventsByCategory[selectedCategory].map((event) => (
                  <ActivityCardUser key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
