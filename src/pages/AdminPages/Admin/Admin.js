import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuSiderAdmin from "../../../components/Admin/MenuSiderAdmin/MenuSiderAdmin";
import { Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./Admin.scss";
import { ActivityCardAdmin } from "../../../components/Admin/ActivityCardAdmin/ActivityCardAdmin";
import MenuTopAdmin from "../../../components/Admin/MenuTopAdmin/MenuTopAdmin";
import AddEventCube from "../../../components/Admin/AddEventCube/AddEventCube";

const { Option } = Select;

export const Admin = () => {
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
    <div className="admin">
      <MenuSiderAdmin menuCollapsed={menuCollapsed} />
      <MenuTopAdmin
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div className="container-admin">
        <div className="search-card-admin">
          <Input
            className="search-input-admin"
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <Select
            placeholder="Filtrar"
            className="custom-select-admin"
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
        <div className="events-container-admin">
          {selectedCategory === null ? (
            categories.map((category) => (
              <div key={category} className="category-row-admin">
                <h1>{category}</h1>
                <div className="activity-cards-row-admin">
                  {eventsByCategory[category].map((event) => (
                    <ActivityCardAdmin key={event._id} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row-admin">
              <h1>{selectedCategory}</h1>
              <div className="activity-cards-row-admin">
                {eventsByCategory[selectedCategory].map((event) => (
                  <ActivityCardAdmin key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <AddEventCube/>
    </div>
  );
};

export default Admin;
