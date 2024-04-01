import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuSider from "../../../components/Guest/MenuSider/MenuSider";
import { Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./index.scss";
import { ActivityCard } from "../../../components/Guest/ActivityCard/ActivityCard";
import MenuTop from "../../../components/Guest/MenuTop/MenuTop";

const { Option } = Select;

const Index = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [events, setEvents] = useState([]);

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
    <div className="index">
      <MenuSider menuCollapsed={menuCollapsed} />
      <MenuTop
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      <div className="container">
        <div className="search-card">
          <Input
            className="search-input"
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.85)" }} />}
          />
          <Select
            placeholder="Filtrar"
            className="custom-select"
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
        <div className="events-container">
          {selectedCategory === null ? (
            categories.map((category) => (
              <div key={category} className="category-row">
                <h1>{category}</h1>
                <div className="activity-cards-row">
                  {eventsByCategory[category].map((event) => (
                    <ActivityCard key={event._id} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row">
              <h1>{selectedCategory}</h1>
              <div className="activity-cards-row">
                {eventsByCategory[selectedCategory].map((event) => (
                  <ActivityCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
