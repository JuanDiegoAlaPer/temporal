import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuSiderUser from "../../../components/User/MenuSiderUser/MenuSiderUser";
import { Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./HomeQualify.scss";
import { ActivityCardQualify } from "../../../components/User/ActivityCardUser/ActivityCardQualify";
import MenuTopUser from "../../../components/User/MenuTopUser/MenuTopUser";

const { Option } = Select;

export const HomeQualify = () => {
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
    <div className="homequalify">
      <MenuSiderUser menuCollapsed={menuCollapsed} />
      <MenuTopUser
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div className="container-homequalify">
        <div className="search-card-homequalify">
          <Input
            className="search-input-homequalify"
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <Select
            placeholder="Filtrar"
            className="custom-select-homequalify"
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
        <div className="events-container-homequalify">
          {selectedCategory === null ? (
            categories.map((category) => (
              <div key={category} className="category-row-homequalify">
                <h1>{category}</h1>
                <div className="activity-cards-row-user">
                  {eventsByCategory[category].map((event) => (
                    <ActivityCardQualify key={event._id} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row-homequalify">
              <h1>{selectedCategory}</h1>
              <div className="activity-cards-row-homequalify">
                {eventsByCategory[selectedCategory].map((event) => (
                  <ActivityCardQualify key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeQualify;