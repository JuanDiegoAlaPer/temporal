import React from 'react';
import './ActivityCard.scss';
import { Link } from 'react-router-dom';

export const ActivityCard = ({ event }) => {
  const { evenTitle, date, image } = event;
  const imageUrl = `http://localhost:3200/api/v1/events/images/${image}`;

  return (
    <div className='ActivityCard'>
      <div className='ActivityCard-content'>
      <img src={imageUrl} alt={evenTitle} className='event-image' />
        <div className='Activity-info'>
          <div className='date'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      <div className='inscription-button'>
        <Link style={{textDecoration: "none", color:"inherit"}} to={`/inscribeForm/${event._id}`}>
          <h2>Inscribete</h2>
        </Link>
      </div>
    </div>
  );
};
