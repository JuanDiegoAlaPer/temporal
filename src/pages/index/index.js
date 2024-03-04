import React, { useState } from "react";
import MenuSider from "../../components/MenuSider/MenuSider";
import { Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./index.scss";
import { ActivityCard } from "../../components/ActivityCard/ActivityCard";
import MenuTop from "../../components/MenuTop/MenuTop";

const { Option } = Select;

export const Index = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setSelectedCategory(value === "all" ? null : value);
  };

  const [events, setEvents] = useState([
    {
      eventId: "1",
      eventTitle: "Cumple de Sofi",
      eventSubtitle: "Descripción 1",
      eventDescription: "Descripción detallada del evento 1",
      created_at: "11-10-2023",
      date: { month: "MAR", day: "03" },
      category: "Categoría Sofi",
      active: true,
    },
    {
      eventId: "2",
      eventTitle: "Evento 2",
      eventSubtitle: "Descripción 2",
      eventDescription: "Descripción detallada del evento 2",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 1",
      active: true,
    },
    {
      eventId: "3",
      eventTitle: "Evento 3",
      eventSubtitle: "Descripción 3",
      eventDescription: "Descripción detallada del evento 3",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 1",
      active: true,
    },
    {
      eventId: "4",
      eventTitle: "Evento 4",
      eventSubtitle: "Descripción 4",
      eventDescription: "Descripción detallada del evento 4",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 1",
      active: true,
    },
    {
      eventId: "5",
      eventTitle: "Evento 5",
      eventSubtitle: "Descripción 5",
      eventDescription: "Descripción detallada del evento 5",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 1",
      active: true,
    },
    {
      eventId: "6",
      eventTitle: "Evento 6",
      eventSubtitle: "Descripción 6",
      eventDescription: "Descripción detallada del evento 6",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 2",
      active: false,
    },
    {
      eventId: "7",
      eventTitle: "Evento 7",
      eventSubtitle: "Descripción 7",
      eventDescription: "Descripción detallada del evento 7",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 5",
      active: true,
    },
    {
      eventId: "8",
      eventTitle: "Evento 8",
      eventSubtitle: "Descripción 8",
      eventDescription: "Descripción detallada del evento 8",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 2",
      active: true,
    },
    {
      eventId: "9",
      eventTitle: "Evento 9",
      eventSubtitle: "Descripción 9",
      eventDescription: "Descripción detallada del evento 9",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 2",
      active: false,
    },
    {
      eventId: "10",
      eventTitle: "Evento 10",
      eventSubtitle: "Descripción 10",
      eventDescription: "Descripción detallada del evento 10",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 2",
      active: true,
    },
    {
      eventId: "11",
      eventTitle: "Evento 11",
      eventSubtitle: "Descripción 11",
      eventDescription: "Descripción detallada del evento 11",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 3",
      active: true,
    },
    {
      eventId: "12",
      eventTitle: "Evento 12",
      eventSubtitle: "Descripción 12",
      eventDescription: "Descripción detallada del evento 12",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 3",
      active: true,
    },
    {
      eventId: "13",
      eventTitle: "Evento 13",
      eventSubtitle: "Descripción 13",
      eventDescription: "Descripción detallada del evento 13",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 3",
      active: true,
    },
    {
      eventId: "14",
      eventTitle: "Evento 14",
      eventSubtitle: "Descripción 14",
      eventDescription: "Descripción detallada del evento 14",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Deportes",
      active: true,
    },
    {
      eventId: "15",
      eventTitle: "Evento 15",
      eventSubtitle: "Descripción 15",
      eventDescription: "Descripción detallada del evento 15",
      created_at: "11-10-2023",
      date: { month: "FEB", day: "22" },
      category: "Categoría 3",
      active: true,
    },
  ]);

  const filteredEventsTitle = events.filter((event) =>
    event.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredEvents = events.filter(
    (event) =>
      event.active &&
      event.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
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
                <h1 style={{ marginLeft: 100 }}>{category}</h1>
                <div className="activity-cards-row">
                  {eventsByCategory[category].map((event) => (
                    <ActivityCard key={event.eventId} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-row">
              <h1 style={{ marginLeft: 100 }}>{selectedCategory}</h1>
              <div className="activity-cards-row">
                {eventsByCategory[selectedCategory].map((event) => (
                  <ActivityCard key={event.eventId} event={event} />
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
