import React from 'react';
import './ActivityCardAdmin.scss';
import { Link } from 'react-router-dom';

export const ActivityCardAdmin = ({ event }) => {
  const { evenTitle, date, image, active } = event;
  const backgroundClass = active ? '-active-background' : '-inactive-background';
  const imageUrl = `http://localhost:3200/api/v1/events/images/${image}`;
  return (
    <div className='ActivityCard-admin'>
      <div className={`ActivityCard-content-admin${backgroundClass}`}>
      <img src={imageUrl} alt={evenTitle} className='event-image-admin' />
        <div className='Activity-info-admin'>
          <div className='date-admin'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name-admin'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      <div className='edit-button-admin'>
        <Link style={{textDecoration: "none", color:"inherit"}} to={`/eventEdit/${event._id}`}>
          <h2>Editar</h2>
        </Link>
      </div>
    </div>
  );
};
